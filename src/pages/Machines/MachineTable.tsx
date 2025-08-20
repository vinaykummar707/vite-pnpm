'use client'































import { EditMachineDialog } from './EditMachineDialog';
import { DeleteMachineDialog } from './DeleteMachineDialog';
import { Alert,  AlertTitle, AlertDescription } from '@/components/ui/alert';
import { TriangleAlertIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
export function MachineTable({ machines }: { machines: any[] }) {
    return (
    //   <Alert className='bg-destructive/10 text-destructive border-none'>
    //   <TriangleAlertIcon />
    //   <AlertTitle>Upload failed</AlertTitle>
    //   <AlertDescription className='text-destructive/80'>
    //     Something went wrong. Please try again or use a different file format.
    //   </AlertDescription>
    // </Alert>
    <Card className='bg-destructive/10 text-destructive border h-[200px] border-destructive/20'>

    </Card>
    );
}
