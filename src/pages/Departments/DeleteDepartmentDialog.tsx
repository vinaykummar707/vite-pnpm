"use client";

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { gql, useMutation } from "@apollo/client";
import { toast } from "sonner";
import { useState } from "react";
import { DELETE_DEPARTMENT } from "@/gql/departments/departments.gql";


export function DeleteDepartmentDialog({ departmentId }: { departmentId: string }) {
  const [open, setOpen] = useState(false);
  const [deleteDepartment, { loading }] = useMutation(DELETE_DEPARTMENT);

 const handleDelete = async () => {
  try {
    await deleteDepartment({
      variables: {
        id: departmentId,
        deletedAt: new Date().toISOString(),
      },
    });
    toast.success("Department deleted");
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
        <p className="text-sm">Are you sure you want to delete this department?</p>
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
