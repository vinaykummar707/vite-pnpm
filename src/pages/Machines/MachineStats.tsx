'use client'

import { useDialysisUnitStore } from '@/store/useDialysisUnitStore'
import { useSubscription, gql, useQuery } from '@apollo/client'
import { AddMachineDialog } from './AddMachineDialog'
import { MachineTable } from './MachineTable'
import { GET_MACHINES, MACHINE_STATS_QUERY } from '@/gql/machines/machines.gql'
import { Card, CardContent } from '@/components/ui/card'




export default function MachineStats() {
  const { selectedUnit } = useDialysisUnitStore()
  const { data, loading, error } = useQuery(MACHINE_STATS_QUERY, {
    variables: { dialysisUnitId: selectedUnit?.id },
    skip: !selectedUnit?.id,
  });

  if (!selectedUnit) {
    return <p className="p-4">Please select a Dialysis Unit to display machine statistics.</p>;
  }

  if (loading) {
    return <p className="p-4">Loading machine statistics...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">Error loading statistics: {error.message}</p>;
  }


  return (
    <div className="grid grid-cols-2 gap-2">
      <Card className=" bg-primary border-primary">
        <CardContent>
        <h2 className="text-xs ">Occupied</h2>
        <p className="text-2xl font-bold">{data.occupied.aggregate.count}</p>
        </CardContent>
   
      </Card>
      <Card className=" border-destructive bg-destructive">
        <CardContent>
        <h2 className="text-xs">Available</h2>
        <p className="text-2xl font-bold">{data.free.aggregate.count}</p>
        </CardContent>
      </Card>
    </div>
  )
}
