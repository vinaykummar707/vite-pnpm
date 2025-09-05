'use client';

import React, { useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { colorSchemeDark } from 'ag-grid-community';
import { Card, CardContent } from '@/components/ui/card';
import Avvvatars from 'avvvatars-react';
import { Button } from '@/components/ui/button';
import { Edit2, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
ModuleRegistry.registerModules([AllCommunityModule]);


export function PatientsList({ patients }) {




    const columnDefs = useMemo(
        () => [
            { field: 'name', sortable: true, filter: true },
            { field: 'age', sortable: true, filter: true },
            { field: 'gender', sortable: true, filter: true },
            { field: 'phone', sortable: true, filter: true },
            { field: 'email', sortable: true, filter: true },
            { field: 'set_usage', sortable: true, filter: true },
            { field: 'dialysis_frequency', sortable: true, filter: true },
            { field: 'dialyser', sortable: true, filter: true },
            { field: 'payment_mode', sortable: true, filter: true },
            //   { field: 'condition', sortable: true, filter: true },
            //   { field: 'status', sortable: true, filter: true },
        ],
        []
    );

    const defaultColDef = useMemo(
        () => ({
            flex: 1,
            minWidth: 100,
        }),
        []
    );

    return (
        <div className="grid grid-cols-5 gap-2">
            {
                patients.length > 0 ? (
                    patients.map((patient: any) => (
                        <Card className='shadow-none'>
                            <CardContent className='flex flex-col h-[200px] justify-between'>
                                <Avvvatars size={36} style="shape" value={patient.email} />

                                <div className="flex flex-col gap-2">
                                    <span className=" font-bold">
                                        {patient.name}
                                    </span>
                                    <div className="flex flex-wrap gap-2 capitalize items-center">
                                        <Badge variant={'secondary'}>
                                            {patient.age} years
                                        </Badge>
                                        <Badge variant={'secondary'}>
                                            {patient.payment_mode}
                                        </Badge>
                                        
                                        <Badge variant={'secondary'}>
                                            {patient.set_usage} set
                                        </Badge>
                                    </div>
                                        
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <Badge className="bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 shadow-none rounded">
                                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2" /> 
                                        In Dialysis
                                    </Badge>
                                    <div className="flex items-center gap-1">
                                        <Button variant={'outline'} size={'sm'}>
                                            <Edit2 />
                                        </Button>
                                        <Button variant={'outline'} size={'sm'}>
                                            <Trash />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>))
                ) : (
                    <div>No patients found.</div>
                )
            }
        </div>
    );
}

