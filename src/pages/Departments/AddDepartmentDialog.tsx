"use client";

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { gql, useMutation } from "@apollo/client";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDialysisUnitStore } from "@/store/useDialysisUnitStore";
import { type DepartmentFormData, DepartmentForm } from "./DepartmentForm";
import { ADD_DEPARTMENT } from "@/gql/departments/departments.gql";




export function AddDepartmentDialog() {
  const [open, setOpen] = useState(false);
  const {selectedUnit} = useDialysisUnitStore()
  const [addDepartment, { loading }] = useMutation(ADD_DEPARTMENT);

  const handleAdd = async (data: DepartmentFormData) => {
    try {
      await addDepartment({ variables: { object: {...data, dialysis_unit_id: selectedUnit?.id,} } });
      toast.success("Department added");
      setOpen(false);
    } catch (e) {
      toast.error(`Failed to add ${e}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Department</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Department</DialogTitle>
          <DialogDescription>Add details below.</DialogDescription>

        </DialogHeader>
        <DepartmentForm onSubmit={handleAdd} loading={loading} />
      </DialogContent>
    </Dialog>
  );
}
