"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TechnicianForm, type TechnicianFormData } from "./TechnicianForm";
import { gql, useMutation } from "@apollo/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const UPDATE_TECHNICIAN = gql`
  mutation UpdateTechnician($id: uuid!, $object: technicians_set_input!) {
    update_technicians_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
    }
  }
`;

export function EditTechnicianDialog({ technician }: { technician: any }) {
  const [open, setOpen] = useState(false);
  const [updateTechnician, { loading }] = useMutation(UPDATE_TECHNICIAN);

  const handleUpdate = async (data: TechnicianFormData) => {
    try {
      await updateTechnician({
        variables: {
          id: technician.id,
          object: data,
        },
      });
      toast.success("Technician updated");
      setOpen(false);
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent className="w-[360px]">
        <DialogHeader>
          <DialogTitle>Edit Technician</DialogTitle>
        </DialogHeader>
        <TechnicianForm
          onSubmit={handleUpdate}
          initialValues={{
            name: technician.name,
            email: technician.email,
            phone: technician.phone,
          }}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
