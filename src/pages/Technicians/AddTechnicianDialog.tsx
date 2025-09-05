"use client";

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { TechnicianForm, type TechnicianFormData } from "./TechnicianForm";
import { useDialysisUnitStore } from "@/store/useDialysisUnitStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const ADD_TECHNICIAN = gql`
  mutation AddTechnician($object: technicians_insert_input!) {
    insert_technicians_one(object: $object) {
      id
    }
  }
`;

export function AddTechnicianDialog() {
  const { selectedUnit } = useDialysisUnitStore();
  const [open, setOpen] = useState(false);
  const [addTechnician, { loading }] = useMutation(ADD_TECHNICIAN);

  const handleAdd = async (data: TechnicianFormData) => {
    try {
      await addTechnician({
        variables: {
          object: {
            ...data,
            dialysis_unit_id: selectedUnit?.id,
          },
        },
      });
      toast.success("Technician added");
      setOpen(false);
    } catch (e) {
      toast.error("Failed to add technician ");
    }
  };

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Technician</Button>
      </DialogTrigger>
      <DialogContent className = 'w-[360px]'>
        <DialogHeader>
          <DialogTitle>Add Technician</DialogTitle>
          <DialogDescription>Add details below.</DialogDescription>
        </DialogHeader>
        <TechnicianForm onSubmit={handleAdd} loading={loading} />
      </DialogContent>
    </Dialog>
  );
}
