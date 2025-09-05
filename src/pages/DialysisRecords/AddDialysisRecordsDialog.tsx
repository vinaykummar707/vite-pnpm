"use client";

import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useDialysisUnitStore } from "@/store/useDialysisUnitStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialysisRecordForm, type DialysisRecordFormData } from "./DialysisRecordForm";
import { ADD_DIALYSIS_RECORD } from "@/gql/records/records.gql";



export function AddDialysisRecordDialog() {
  const [open, setOpen] = useState(false);
  const [addDialysisRecord, { loading }] = useMutation(ADD_DIALYSIS_RECORD);
  // const {selectedUnit} = useDialysisUnitStore()

  const handleAdd = async (data: DialysisRecordFormData) => {
    try {
      await addDialysisRecord({ variables: { object: data } });
      toast.success("Record added");
      setOpen(false);
    } catch (e: any) {
      toast.error(`Failed to add patient: ${e.message || e}`);
    }
    console.log(data)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Record</Button>
      </DialogTrigger>
      <DialogContent className="bg-white" >
        <DialogHeader>
          <DialogTitle>Add New Dialysis Record</DialogTitle>
          {/* <DialogDescription>Add details below.</DialogDescription> */}

        </DialogHeader>
        <ScrollArea className="h-[480px]">
          <DialysisRecordForm onSubmit={handleAdd} loading={loading} />

        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
