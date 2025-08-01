'use client';

import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';

const DELETE_UNIT = gql`
    mutation DeleteDialysisUnit($id: uuid!) {
        delete_dialysis_units_by_pk(id: $id) {
            id
        }
    }
`;

interface DeleteDialysisUnitDialogProps {
    unitId: string;
    unitName: string;
    onSuccess?: () => void;
}

export default function DeleteDialysisUnitDialog({ 
    unitId, 
    unitName, 
    onSuccess 
}: DeleteDialysisUnitDialogProps) {
    const [deleteUnit, { loading }] = useMutation(DELETE_UNIT);
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteUnit({ variables: { id: unitId } });
            toast.success('Unit deleted successfully');
            setOpen(false);
            onSuccess?.();
        } catch (error) {
            toast.error('Failed to delete unit');
            console.error('Error deleting unit:', error);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button 
                    size='sm' 
                    variant='destructive'
                    onClick={() => setOpen(true)}
                >
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the dialysis unit "{unitName}" and remove all associated data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className='flex justify-end gap-2'>
                    <Button 
                        variant='secondary' 
                        onClick={handleCancel}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant='destructive' 
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        Delete
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
} 