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
import { columns, type DialysisRecord } from "./DialysisRecordsTableColumns"

export default function DialysisTable({ data,showCountDownColumn }: { data: DialysisRecord[],showCountDownColumn: boolean }) {
    const [sorting, setSorting] = useState([])
    const [globalFilter, setGlobalFilter] = useState("")
    const [columnFilters, setColumnFilters] = useState([])

    const [columnVisibility, setColumnVisibility] = useState({
        countdown: showCountDownColumn, // hide countdown column
    })

    const table = useReactTable({
        data,
        columns,
        state: { sorting, columnFilters, columnVisibility },
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting as any, // Type assertion to bypass type error
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    return (
        <div className="space-y-4">
            {/* Global Search */}
            {/* <Input
                placeholder="Search patients..."
                value={(table.getColumn("patient")?.getFilterValue() as string) ?? ""}
                onChange={(e) => table.getColumn("patient")?.setFilterValue(e.target.value)}
                
                className="max-w-sm"
            /> */}

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((hg) => (
                        <TableRow key={hg.id}>
                            {hg.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="cursor-pointer select-none"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {{
                                        asc: " 🔼",
                                        desc: " 🔽",
                                    }[header.column.getIsSorted() as string] ?? null}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
