"use client";

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, gql } from "@apollo/client";
import { toast } from "sonner";
import { useState } from "react";

const DELETE_TECHNICIAN = gql`
  mutation DeleteTechnician($id: uuid!,  $deletedAt: timestamp!) {
    update_technicians_by_pk(
    pk_columns: { id: $id }
      _set: { deleted_at: $deletedAt }
    ) {
      id
    }
  }
`;

export function DeleteTechnicianDialog({ technicianId }: { technicianId: string }) {
  const [open, setOpen] = useState(false);
  const [deleteTechnician, { loading }] = useMutation(DELETE_TECHNICIAN);

  const handleDelete = async () => {
    try {
      await deleteTechnician({ variables: { id: technicianId,deletedAt: new Date().toISOString(), } });
      toast.success("Technician deleted");
      setOpen(false);
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <p className="text-sm">Are you sure you want to delete this technician?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
