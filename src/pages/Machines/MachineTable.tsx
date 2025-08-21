'use client'
import { EditMachineDialog } from './EditMachineDialog';
import { DeleteMachineDialog } from './DeleteMachineDialog';
import { Card, CardContent } from '@/components/ui/card';
export function MachineTable({ machines }: { machines: any[] }) {
    return (
    <div className="grid grid-cols-4 gap-4">
    {machines.map((machine) => (
        <Card key={machine.id} className="shadow-none  bg-secondary dark:bg-card">
            <CardContent>
                <h3 className="text-md font-bold">{machine.name}</h3>
                <p className="text-xs">{machine.is_occupied ? <span className="text-red-500">Occupied</span> : <span className="text-green-500">Available</span>}</p>
                <div className="space-x-2 mt-2">
                    <EditMachineDialog machine={machine} />
                    <DeleteMachineDialog id={machine.id} />
                </div>
            </CardContent>
        </Card>
    ))}
</div>
    );
}
