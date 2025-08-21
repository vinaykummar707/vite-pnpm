"use client";

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DepartmentForm, type DepartmentFormData } from "./DepartmentForm";
import { gql, useMutation } from "@apollo/client";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UPDATE_DEPARTMENT } from "@/gql/departments/departments.gql";


export function EditDepartmentDialog({ department }: { department: any }) {
  const [open, setOpen] = useState(false);
  const [updateDepartment, { loading }] = useMutation(UPDATE_DEPARTMENT);

  const handleUpdate = async (data: DepartmentFormData) => {
    try {
      await updateDepartment({
        variables: { id: department.id, object: data },
      });
      toast.success("Department updated");
      setOpen(false);
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
        </DialogHeader>
        <DepartmentForm
          onSubmit={handleUpdate}
          initialValues={{ name: department.name }}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
