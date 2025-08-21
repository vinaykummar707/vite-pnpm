'use client'

import { Card, CardContent } from '@/components/ui/card';
import { EditPatientDialog } from './EditPatientDialog';
export function PatientsList({ patients }: { patients: any[] }) {
    return (
    <div className="grid grid-cols-4 gap-4">
    {patients.map((patient) => (
        <Card key={patient.id} className="shadow-none  bg-secondary dark:bg-card">
            <CardContent>
                <h3 className="text-md font-bold">{patient.name}</h3>
                <div className="space-x-2 mt-2">
                    <EditPatientDialog patient={patient}/>
                </div>
            </CardContent>
        </Card>
    ))}
</div>
    );
}
