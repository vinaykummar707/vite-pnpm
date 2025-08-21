'use client'

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { gql, useMutation } from '@apollo/client'
import { toast } from 'sonner'
import { useState } from 'react'
import { DELETE_MACHINE } from '@/gql/machines/machines.gql'


export function DeleteMachineDialog({ id }: { id: string }) {
  const [open, setOpen] = useState(false)
  const [deleteMachine, { loading }] = useMutation(DELETE_MACHINE)

  const handleDelete = async () => {
    try {
      await deleteMachine({ variables: { id, deletedAt: new Date().toISOString() } })
      toast.success('Machine deleted')
      setOpen(false)
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Machine</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this machine?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Confirm'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
