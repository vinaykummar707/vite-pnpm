'use client'

import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const UPDATE_MACHINE = gql`
  mutation UpdateMachine($id: uuid!, $name: String!, $is_occupied: Boolean!) {
    update_machines_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, is_occupied: $is_occupied }
    ) {
      id
    }
  }
`

export function EditMachineDialog({ machine }: { machine: any }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(machine.name)
  const [isOccupied, setIsOccupied] = useState(machine.is_occupied)

  const [updateMachine, { loading }] = useMutation(UPDATE_MACHINE)

  const handleUpdate = async () => {
    try {
      await updateMachine({ variables: { id: machine.id, name, is_occupied: isOccupied } })
      toast.success('Machine updated')
      setOpen(false)
    } catch {
      toast.error('Update failed')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Machine</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Machine name" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isOccupied} onChange={(e) => setIsOccupied(e.target.checked)} />
            Occupied
          </label>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
