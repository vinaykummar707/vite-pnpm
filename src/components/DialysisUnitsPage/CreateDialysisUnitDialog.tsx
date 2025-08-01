'use client';

import { useState } from 'react';
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
import { useAuth } from '@/providers/AuthProvider';
import DialysisUnitForm, { type FormData } from './DialysisUnitForm';

const ADD_UNIT = gql`
    mutation InsertDialysisUnit($name: String!, $location: String!,$created_by: uuid!) {
        insert_dialysis_units_one(object: { name: $name, location: $location, created_by: $created_by }) {
            id
        }
    }
`;

const UPDATE_UNIT_ADMIN = gql`
    mutation UpdateUnitAdmin($id: uuid!, $dialysis_unit_id: uuid!,$has_: uuid!) {
        update_unit_admins_by_pk(
            pk_columns: { id: $id }, 
            _set: { dialysis_unit_id: $dialysis_unit_id }
        ) {
            id
            dialysis_unit_id
        }
    }
`;

interface CreateDialysisUnitDialogProps {
    onSuccess?: () => void;
}

export default function CreateDialysisUnitDialog({ onSuccess }: CreateDialysisUnitDialogProps) {
    const auth = useAuth();
    const [addUnit, { loading: addUnitLoading }] = useMutation(ADD_UNIT);
    const [updateUnitAdmin, { loading: updateAdminLoading }] = useMutation(UPDATE_UNIT_ADMIN);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (values: FormData) => {
        try {
            // First, create the dialysis unit
            const { data: unitData } = await addUnit({ 
                variables: {
                    ...values,
                    created_by: auth?.user?.id
                }
            });
            
            const unitId = unitData?.insert_dialysis_units_one?.id;
            
            if (!unitId) {
                throw new Error('Failed to get unit ID');
            }

            // Get the logged-in user ID
            const userId = auth?.user?.id;
            
            if (!userId) {
                throw new Error('User not authenticated');
            }

            // Update the existing unit admin record with the new dialysis unit ID
            await updateUnitAdmin({
                variables: {
                    id: userId,
                    dialysis_unit_id: unitId,
                    has_onboarded: true
                }
            });

            toast.success('Unit created and admin access updated successfully');
            setOpen(false);
            onSuccess?.();
        } catch (error) {
            console.error('Error creating unit and updating admin:', error);
            toast.error('Failed to create unit and update admin access');
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const isLoading = addUnitLoading || updateAdminLoading;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Unit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Dialysis Unit</DialogTitle>
                    <DialogDescription>
                        Create a new dialysis unit by filling in the details below. Your admin access will be updated to this unit.
                    </DialogDescription>
                </DialogHeader>
                <DialysisUnitForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    submitButtonText="Create"
                    isLoading={isLoading}
                />
            </DialogContent>
        </Dialog>
    );
} 