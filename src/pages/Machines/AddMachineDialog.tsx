'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { gql, useMutation } from '@apollo/client'
import { useDialysisUnitStore } from '@/store/useDialysisUnitStore'
import { toast } from 'sonner'

const ADD_MACHINE = gql`
  mutation AddMachine($name: String!, $dialysis_unit_id: uuid!) {
    insert_machines_one(object: { name: $name, dialysis_unit_id: $dialysis_unit_id }) {
      id
    }
  }
`

export function AddMachineDialog({ existingMachines }: { existingMachines: { name: string }[] }) {
  const { selectedUnit } = useDialysisUnitStore()
  const [open, setOpen] = useState(false)
  const [addMachine, { loading }] = useMutation(ADD_MACHINE)

  const getNextMachineName = () => {
    const suffixes = existingMachines
      .map((m) => parseInt(m.name.replace('Machine', ''), 10))
      .filter((n) => !isNaN(n))
    return `Machine${Math.max(0, ...suffixes) + 1}`
  }

  const handleAdd = async () => {
    try {
      const name = getNextMachineName()
      await addMachine({ variables: { name, dialysis_unit_id: selectedUnit?.id } })
      toast.success(`Machine ${name} added`)
      setOpen(false)
    } catch {
      toast.error('Add failed')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Machine</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Machine</DialogTitle>
        </DialogHeader>
        <p>Add new machine to this dialysis unit?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} disabled={loading}>
            {loading ? 'Adding...' : 'Confirm'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
