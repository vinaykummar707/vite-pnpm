'use client'

import { useDialysisUnitStore } from '@/store/useDialysisUnitStore'
import { useSubscription, gql } from '@apollo/client'
import { AddMachineDialog } from './AddMachineDialog'
import { MachineTable } from './MachineTable'
import { GET_MACHINES } from '@/gql/machines/machines.gql'




export default function MachinesPage() {
  const { selectedUnit } = useDialysisUnitStore()
  const { data } = useSubscription(GET_MACHINES, {
    variables: { unitId: selectedUnit?.id },
    skip: !selectedUnit?.id,
  })

  if (!selectedUnit) return <p className="p-4">Please select a Dialysis Unit</p>

  return (
    <div className=" space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Machines</h1>
        <AddMachineDialog existingMachines={data?.machines || []} />
      </div>
      <MachineTable machines={data?.machines || []} />
    </div>
  )
}
