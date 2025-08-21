'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { useDialysisUnitStore } from "@/store/useDialysisUnitStore";
import { AddDepartmentDialog } from './AddDepartmentDialog';
import { DeleteDepartmentDialog } from './DeleteDepartmentDialog';
import { EditDepartmentDialog } from './EditDepartmentDialog';
import { GET_DEPARTMENTS } from '@/gql/departments/departments.gql';




export default function DepartmentsPage() {
    const { selectedUnit } = useDialysisUnitStore();
    const { data } = useSubscription(GET_DEPARTMENTS, {
        variables: { unitId: selectedUnit?.id },
        skip: !selectedUnit?.id,
    });

    return (
        <div className='space-y-6'>
             <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Departments</h1>
        <AddDepartmentDialog />

      </div>
            <Card>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className='text-right'>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.departments?.map((dept: any) => (
                                <TableRow key={dept.id}>
                                    <TableCell>{dept.name}</TableCell>
                                    <TableCell className='flex justify-end gap-2 text-right'>
                                        <EditDepartmentDialog department={dept} />
                                        <DeleteDepartmentDialog departmentId={dept.id} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
