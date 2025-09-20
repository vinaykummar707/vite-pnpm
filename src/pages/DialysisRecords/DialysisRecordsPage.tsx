import { useState, useEffect } from 'react'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { format, formatDate } from 'date-fns'
import {
  ArrowUpRight,
  Bed,
  CalendarIcon,
  Check,
  Droplet,
  StopCircleIcon,
  TestTube2,
  Timer,
  Weight,
} from 'lucide-react'
import Avvvatars from 'avvvatars-react'

import { useDialysisUnitStore } from '@/store/useDialysisUnitStore'
import { GET_DIALYSIS_RECORDS_BY_DATE, UPDATE_ENDED_AT, UPDATE_STARTED_AT } from '@/gql/records/records.gql'

import { AddDialysisRecordDialog } from './AddDialysisRecordsDialog'
import CircularCountdown from './CircularComponent'

import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import DialysisRecordRow from './DialysisRecordListCard'
import { OCCUPY_MACHINE } from '@/gql/machines/machines.gql'
import DialysisTable from './DialysisRecordsTable'

// --- Main Page ---
export default function DialysisRecordsPage() {
  const selectedUnit = useDialysisUnitStore((s) => s.selectedUnit)
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Format the date to a 'yyyy-MM-dd' string.
  const formattedDate = date ? format(date, 'yyyy-MM-dd') : null;

  const { data: records } = useSubscription(GET_DIALYSIS_RECORDS_BY_DATE, {
    variables: {
      unitId: selectedUnit?.id,
      date: formattedDate // Use the formatted string here
    },
    skip: !selectedUnit?.id || !formattedDate,
  });


  useEffect(() => {
    console.log('date:', date)
  }, [date])

  // --- classify records into groups
  const inProgress = records?.dialysis_records.filter(
    (r: any) => r.started_at && !r.ended_at
  ) || []

  const pending = records?.dialysis_records.filter(
    (r: any) => !r.started_at
  ) || []

  const completed = records?.dialysis_records.filter(
    (r: any) => r.started_at && r.ended_at
  ) || []







  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Records</h1>
        <div className="flex items-center gap-2">
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? formatDate(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>

          {/* Add Record */}
          <AddDialysisRecordDialog />
        </div>
      </div>

      <div className="space-y-8">
        {/* In Progress */}
        {inProgress.length > 0 && (
          <div>
            <h2 className="text-sm text-muted-foreground mb-2">In Progress</h2>
            <div className="w-full border bg-card p-4 rounded-lg">
              <DialysisTable showCountDownColumn={true} data={inProgress} />

            </div>
          </div>
        )}

        {/* Pending */}
        {pending.length > 0 && (
          <div>
            <h2 className="text-sm text-muted-foreground mb-2">To be started</h2>
            <div className="w-full border bg-card p-4 rounded-lg">

              <DialysisTable showCountDownColumn={false} data={pending} />
            </div>
          </div>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <div>
            <h2 className="text-sm text-muted-foreground  mb-2">Completed</h2>
            <div className="w-full border bg-card p-4 rounded-lg">

              <DialysisTable showCountDownColumn={false} data={completed} />

            </div>
          </div>
        )}
      </div>
    </div>
  )
}
