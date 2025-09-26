"use client";

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { gql, useMutation } from "@apollo/client";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ADD_STOP } from "@/gql/stops.gql";
import type { StopFormData } from "./StopsForm";
import StopsForm from "./StopsForm";

export function AddStopsDialog() {
  const [open, setOpen] = useState(false);
  const [addStop, { loading }] = useMutation(ADD_STOP);

  const handleAdd = async (data: StopFormData) => {
    try {
      await addStop({ variables: { object: data } });
      toast.success("Stop added");
    console.log(data)
      setOpen(false);
    } catch (e) {
      toast.error(`Failed to add stop: ${e}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Stop</Button>
      </DialogTrigger>
      <DialogContent>
         <StopsForm onSubmit={handleAdd} loading={loading} />
      </DialogContent>
    </Dialog>
  );
}