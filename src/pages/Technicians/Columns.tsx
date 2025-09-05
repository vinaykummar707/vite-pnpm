'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { Technician } from './types'
import { EditTechnicianDialog } from './EditTechnicianDialog'
import { DeleteTechnicianDialog } from './DeleteTechnicianDialog'
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Technician>[] = [
    {
    id: 'select-col',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const tech = row.original
      return (
        <div className="flex gap-2">
          <EditTechnicianDialog technician={tech} />
          <DeleteTechnicianDialog technicianId={tech.id} />
        </div>
      )
    },
  },
]
