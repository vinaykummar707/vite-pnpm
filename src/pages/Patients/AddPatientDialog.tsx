"use client";

import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useDialysisUnitStore } from "@/store/useDialysisUnitStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PatientForm, type PatientFormData } from "./PatientForm";
import { ADD_PATIENT } from "@/gql/patients/patients.gql";



export function AddPatientDialog() {
  const [open, setOpen] = useState(false);
  const [addPatient, { loading }] = useMutation(ADD_PATIENT);
  const {selectedUnit} = useDialysisUnitStore()

  const handleAdd = async (data: PatientFormData) => {
    try {
      await addPatient({ variables: { object: {...data, dialysis_unit_id: selectedUnit?.id} } });
      toast.success("Patient added");
      setOpen(false);
    } catch (e: any) {
      toast.error(`Failed to add patient: ${e.message || e}`);
    }
    console.log(data)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Patient</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
          <DialogDescription>Add details below.</DialogDescription>

        </DialogHeader>
        <ScrollArea className="h-[480px]">
          <PatientForm onSubmit={handleAdd} loading={loading} />

        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
