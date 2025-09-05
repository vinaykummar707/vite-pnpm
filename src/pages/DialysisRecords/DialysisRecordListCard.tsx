'use client'

import { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import { format, formatDate } from 'date-fns'
import {
    ArrowUpRight,
    Bed,
    Building,
    CalendarIcon,
    Check,
    Droplet,
    Eye,
    MoreHorizontal,
    Pencil,
    StopCircle,
    StopCircleIcon,
    TestTube2,
    Timer,
    Weight,
} from 'lucide-react'
import Avvvatars from 'avvvatars-react'

import { useDialysisUnitStore } from '@/store/useDialysisUnitStore'
import { GET_DIALYSIS_RECORDS_BY_DATE } from '@/gql/records/records.gql'

import { AddDialysisRecordDialog } from './AddDialysisRecordsDialog'
import CircularCountdown from './CircularComponent'

import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Cancel } from '@radix-ui/react-alert-dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// --- Dialysis Record Card ---
function DialysisRecordCard({ record }: { record: any }) {
    const hasStarted = Boolean(record.started_at)

    return (
        <Card key={record.id} className="p-0 shadow-none">
            <CardContent className="p-4 items-center flex flex-col gap-4">
                <Badge className="bg-amber-600/10 text-amber-500 shadow-none rounded">
                    In Progress
                </Badge>

                {/* Patient Info */}
                <div className="flex items-center gap-2">
                    <Avvvatars size={24} style="shape" value={record.patient.email} />
                    <h1 className="text-md capitalize font-semibold">
                        {record.patient.name}
                    </h1>
                </div>

                {/* Countdown */}
                <div className="flex flex-col items-center gap-2">
                    <CircularCountdown
                        size={80}
                        strokeWidth={4}
                        hours={record.hours}
                        minutes={record.minutes}
                        startedAt={record.started_at}
                    />
                    <span className="text-sm text-muted-foreground">
                        Started at {format(record.started_at, 'h:mm aa')}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 justify-center">
                    <Button variant="outline">
                        <ArrowUpRight />
                        More
                    </Button>

                    {!hasStarted ? (
                        <Button variant="default" className="bg-lime-500">
                            <Check />
                            Start
                        </Button>
                    ) : (
                        <Button variant="destructive" className="bg-red-600">
                            <StopCircleIcon />
                            Stop
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}


// --- Dialysis Record Card ---

interface Props {
    record: any
    onStart?: () => void
    onStop?: () => void
    onView?: () => void
  }
  


  export default function DialysisRecordRow({  record, onStart, onStop, onView }: Props) {
    const hasStarted = Boolean(record.started_at);
  
    function getBadge(status: string) {
      const badgeStyles: Record<string, string> = {
        inProgress:
          "bg-amber-600/10 px-2.5 py-1 text-amber-500 rounded-lg shadow-none",
        completed:
          "bg-green-600/10 px-2.5 py-1 text-green-500 rounded-lg shadow-none",
        pending:
          "bg-blue-600/10 px-2.5 py-1 text-blue-500 rounded-lg shadow-none",
      };
  
      const badgeText: Record<string, string> = {
        inProgress: "In Progress",
        completed: "Completed",
        pending: "Not Started",
      };
  
      return <Badge className={badgeStyles[status]}>{badgeText[status]}</Badge>;
    }
  
    const status = record.started_at
      ? record.ended_at
        ? "completed"
        : "inProgress"
      : "pending";
  
    return (
        <TableRow className=' '>
        {/* Patient */}
        <TableCell className="min-w-40">
          <div className="flex items-center gap-2">
            <Avvvatars size={24} style="shape" value={record.patient.email} />
            <span className="truncate font-semibold">{record.patient.name.split(' ').slice(0, 1).join(' ')}</span>
          </div>
        </TableCell>

        {/* Set usage */}
        <TableCell className="min-w-20">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building size={16} />
            {record.department.name}
          </div>
        </TableCell>
      
      
        {/* Machine */}
        <TableCell className="min-w-28">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Bed size={16} />
            {record.machine.name}
          </div>
        </TableCell>
      
        {/* UF Goal */}
        <TableCell className="min-w-20">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Droplet size={16} />
            {record.uf_goal} L
          </div>
        </TableCell>
      
        {/* Technician */}
        <TableCell className="min-w-32">
          <div className="flex items-center gap-2">
            <Avvvatars size={20} style="shape" value={record.technician.email} />
            <span className="truncate">{record.technician.name}</span>
          </div>
        </TableCell>

        
        {/* Status */}
        <TableCell>{getBadge(status)}</TableCell>
      
        {/* Set usage */}
        <TableCell className="min-w-20">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TestTube2 size={16} />
            {record.set_usage} Set
          </div>
        </TableCell>
      
        {/* Duration */}
        <TableCell className="min-w-28">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Timer size={16} />
            {record.hours}.{record.minutes} hrs
          </div>
        </TableCell>
      
        {/* Countdown */}
        {record.started_at && !record.ended_at &&  <TableCell>
           
           <CircularCountdown
              size={60}
              strokeWidth={4}
              hours={record.hours}
              minutes={record.minutes}
              startedAt={record.started_at}
            />
        </TableCell> }
      
        {/* Actions */}
        <TableCell className=''>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        {!hasStarted && (
          <DropdownMenuItem onClick={onStart}>
            <Check size={14} className="mr-2" />
            Start
          </DropdownMenuItem>
        )}

        {hasStarted && !record.ended_at && (
          <DropdownMenuItem onClick={onStop} className="text-red-500">
            <StopCircle size={14} className="mr-2" />
            Stop
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={onView}>
          <Eye size={14} className="mr-2" />
          View More
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
          
        </TableCell>
      </TableRow>
      
    );
  }
  