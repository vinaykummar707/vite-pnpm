"use client";

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { gql, useMutation } from "@apollo/client";
import { toast } from "sonner";
import { useState } from "react";
import { DELETE_PATIENT } from "@/gql/patients/patients.gql";


export function DeletePatientDialog({ patientId }: { patientId: string }) {
  const [open, setOpen] = useState(false);
  const [deletePatient, { loading }] = useMutation(DELETE_PATIENT);

 const handleDelete = async () => {
  try {
    await deletePatient({
      variables: {
        id: patientId,
        deletedAt: new Date().toISOString(),
      },
    });
    toast.success("Patient deleted");
    setOpen(false);
  } catch {
    toast.error("Delete failed");
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
        <p className="text-sm">Are you sure you want to delete this patient?</p>
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
