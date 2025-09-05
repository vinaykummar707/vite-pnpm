import { memo, useState } from "react"
import { useMutation } from "@apollo/client"
import { OCCUPY_MACHINE } from "@/gql/machines/machines.gql"
import { UPDATE_STARTED_AT, UPDATE_ENDED_AT } from "@/gql/records/records.gql"
import { MoreHorizontal, Check, StopCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const ActionCell = memo(function ActionCell({ row }: { row: any }) {
  const r = row
  const hasStarted = Boolean(r.started_at)

  // Local loading states (per row)
  const [isStarting, setIsStarting] = useState(false)
  const [isStopping, setIsStopping] = useState(false)

  const [startDialysisMutation] = useMutation(UPDATE_STARTED_AT, {
    onCompleted: () => setIsStarting(false),
    onError: () => setIsStarting(false),
  })

  const [occupyMachineMutation] = useMutation(OCCUPY_MACHINE, {
    onCompleted: () => setIsStarting(false),
    onError: () => setIsStarting(false),
  })

  const [stopDialysisMutation] = useMutation(UPDATE_ENDED_AT, {
    onCompleted: () => setIsStopping(false),
    onError: () => setIsStopping(false),
  })

  const handleStart = async () => {
    console.log("clicked start")
    setIsStarting(true)
    try {
      await Promise.all([
        startDialysisMutation({ variables: { id: r.id } }),
        occupyMachineMutation({
          variables: { id: r.machine.id, patientId: r.patient.id },
        }),
      ])
    } catch (err) {
      console.error(err)
    }
  }

  const handleStop = async () => {
    console.log("clicked stop")
    setIsStopping(true)
    try {
      await stopDialysisMutation({ variables: { id: r.id } })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        {!hasStarted && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault() // prevent auto-close eating the click
              handleStart()
            }}
          >
            <Check size={14} className="mr-2" />
            {isStarting ? "Starting..." : "Start"}
          </DropdownMenuItem>
        )}

        {hasStarted && !r.ended_at && (
          <DropdownMenuItem
            className="text-red-500"
            onSelect={(e) => {
              e.preventDefault()
              handleStop()
            }}
          >
            <StopCircle size={14} className="mr-2" />
            {isStopping ? "Stopping..." : "Stop"}
          </DropdownMenuItem>
        )}

        

        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
            console.log("view", r.id)
          }}
        >
          <Eye size={14} className="mr-2" />
          View More
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
