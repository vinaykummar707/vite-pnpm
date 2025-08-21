// components/EditPatientDialog.tsx
"use client";
import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PatientForm, type PatientFormData } from './PatientForm';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from "sonner";
import { UPDATE_PATIENT } from '@/gql/patients/patients.gql';
import { ScrollArea } from '@/components/ui/scroll-area';


export function EditPatientDialog({ patient }: { patient: any }) {
    const [open, setOpen] = useState(false);
    const [updatePatient, { loading }] = useMutation(UPDATE_PATIENT);

    const handleUpdate = async (data: PatientFormData) => {
        try {
            await updatePatient({
                variables: { id: patient.id, object: data },
            });
            toast.success("Patient updated");
            setOpen(false);
        } catch {
            toast.error("Update failed");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button size="sm">Edit</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Patient</DialogTitle>
                    <DialogDescription>Modify details below.</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[480px]">
                    <PatientForm loading={loading} initialValues={patient} onSubmit={handleUpdate} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}