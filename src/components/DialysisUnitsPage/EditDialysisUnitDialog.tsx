'use client';

import { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import DialysisUnitForm, { type FormData } from './DialysisUnitForm';

const UPDATE_UNIT = gql`
    mutation UpdateDialysisUnit($id: uuid!, $name: String!, $location: String!) {
        update_dialysis_units_by_pk(pk_columns: { id: $id }, _set: { name: $name, location: $location }) {
            id
        }
    }
`;

interface Unit {
    id: string;
    name: string;
    location: string;
}

interface EditDialysisUnitDialogProps {
    unit: Unit;
    onSuccess?: () => void;
}

export default function EditDialysisUnitDialog({ unit, onSuccess }: EditDialysisUnitDialogProps) {
    const [updateUnit, { loading }] = useMutation(UPDATE_UNIT);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (values: FormData) => {
        try {
            await updateUnit({ variables: { id: unit.id, ...values } });
            toast.success('Unit updated successfully');
            setOpen(false);
            onSuccess?.();
        } catch (error) {
            toast.error('Failed to update unit');
            console.error('Error updating unit:', error);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    size='sm' 
                    variant='outline'
                    onClick={() => setOpen(true)}
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Dialysis Unit</DialogTitle>
                    <DialogDescription>
                        Update the dialysis unit information below.
                    </DialogDescription>
                </DialogHeader>
                <DialysisUnitForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    defaultValues={{
                        name: unit.name,
                        location: unit.location
                    }}
                    submitButtonText="Update"
                    isLoading={loading}
                />
            </DialogContent>
        </Dialog>
    );
} 