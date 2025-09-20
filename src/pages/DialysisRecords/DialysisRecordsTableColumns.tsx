"use client"

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    flexRender,

} from "@tanstack/react-table"
import type { ColumnDef } from "@tanstack/react-table";

import { useState } from "react"
import {
    Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Check, StopCircle, Eye, Building, Bed, Droplet, Timer, TestTube2 } from "lucide-react"
import Avvvatars from "avvvatars-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import CircularCountdown from "./CircularComponent"
import { FREE_MACHINE, OCCUPY_MACHINE } from "@/gql/machines/machines.gql";
import { UPDATE_STARTED_AT, UPDATE_ENDED_AT } from "@/gql/records/records.gql";
import { useMutation } from "@apollo/client";
import { Navigate, useNavigate } from "react-router-dom";

export type DialysisRecord = {
    id: string
    patient: { id: string; name: string; email: string }
    department: { id: string; name: string }
    machine: { id: string; name: string }
    technician: { id: string; name: string; email: string }
    uf_goal: number
    set_usage: number
    hours: number
    minutes: number
    started_at?: string
    ended_at?: string
}

function getStatus(record: DialysisRecord) {
    if (record.started_at) {
        return record.ended_at ? "completed" : "inProgress"
    }
    return "pending"
}

function getBadge(status: string) {
    const badgeStyles: Record<string, string> = {
        inProgress: "bg-amber-600/10 px-2.5 py-1 text-amber-500 rounded-lg",
        completed: "bg-green-600/10 px-2.5 py-1 text-green-500 rounded-lg",
        pending: "bg-blue-600/10 px-2.5 py-1 text-blue-500 rounded-lg",
    }
    const badgeText: Record<string, string> = {
        inProgress: "In Progress",
        completed: "Completed",
        pending: "Not Started",
    }
    return <Badge className={badgeStyles[status]}>{badgeText[status]}</Badge>
}




export const columns: ColumnDef<DialysisRecord>[] = [
    {
        accessorKey: "patient",
        header: "Patient",
        enableColumnFilter: true,
        cell: ({ row }) => {
            const record = row.original
            return (
                <div className="flex items-center gap-2">
                    <Avvvatars size={24} style="shape" value={record.patient.email} />
                    <span className="truncate font-semibold">
                        {record.patient.name.split(" ")[0]}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => (
            <div className="flex items-center gap-2 text-muted-foreground">
                <Building size={16} />
                {row.original.department.name}
            </div>
        ),
    },
    {
        accessorKey: "machine",
        header: "Machine",
        cell: ({ row }) => (
            <div className="flex items-center gap-2 text-muted-foreground">
                <Bed size={16} />
                {row.original.machine.name}
            </div>
        ),
    },
    {
        accessorKey: "uf_goal",
        header: "UF Goal",
        cell: ({ row }) => (
            <div className="flex items-center gap-2 text-muted-foreground">
                <Droplet size={16} />
                {row.original.uf_goal} L
            </div>
        ),
    },
    {
        accessorKey: "technician",
        header: "Technician",
        cell: ({ row }) => {
            const t = row.original.technician
            return (
                <div className="flex items-center gap-2">
                    <Avvvatars size={20} style="shape" value={t.email} />
                    <span className="truncate">{t.name}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => getBadge(getStatus(row.original)),
    },
    {
        accessorKey: "set_usage",
        header: "Set",
        cell: ({ row }) => (
            <div className="flex items-center gap-2 text-muted-foreground">
                <TestTube2 size={16} />
                {row.original.set_usage} Set
            </div>
        ),
    },
    {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ row }) => {
            const r = row.original
            return (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Timer size={16} />
                    {r.hours}.{r.minutes} hrs
                </div>
            )
        },
    },
    {
        accessorKey: "countdown",
        header: "Countdown",
        cell: ({ row }) => {
            const r = row.original
            return r.started_at && !r.ended_at &&
                <CircularCountdown
                    size={60}
                    strokeWidth={4}
                    hours={r.hours}
                    minutes={r.minutes}
                    startedAt={r.started_at}
                />

        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const r = row.original
            const hasStarted = Boolean(r.started_at)
            const [startDialysis, { loading: startDialysisLoading }] = useMutation(UPDATE_STARTED_AT);
            const [freeMachine, { loading: freeMachineLoading }] = useMutation(FREE_MACHINE);
            const [stopDialysis, { loading: stopDialysisLoading }] = useMutation(UPDATE_ENDED_AT);
            let navigate = useNavigate();

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MoreHorizontal size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        {!hasStarted && (
                            <DropdownMenuItem onClick={() => {
                                console.log("clikced")
                                startDialysis({ variables: { id: r.id } });
                            }}>
                                <Check size={14} className="mr-2" />
                                {startDialysisLoading   ? 'Starting' : 'Start'}
                            </DropdownMenuItem>
                        )}
                        {hasStarted && !r.ended_at && (
                            <DropdownMenuItem onClick={() => {

                                stopDialysis({ variables: { id: r.id } })
                                freeMachine({ variables: { id: r.machine.id} })
                            }
                            } className="text-red-500">
                                <StopCircle size={14} className="mr-2" />
                                {stopDialysisLoading ? 'Stopping' : 'stop'}
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => navigate(`/records/${r.id}`)}>
                            <Eye size={14} className="mr-2" />
                            View More
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
