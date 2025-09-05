'use client'

import { useSubscription, gql } from '@apollo/client'

import { useDialysisUnitStore } from '@/store/useDialysisUnitStore'
import { AddTechnicianDialog } from './AddTechnicianDialog'
import { TechniciansTable } from './TechniciansTable'
import { columns } from './Columns'
import { GET_TECHNICIANS } from '@/gql/technicians/technicians.gql'



export default function TechniciansPage() {
  const unit = useDialysisUnitStore((s) => s.selectedUnit)
  const { data } = useSubscription(GET_TECHNICIANS, {
    variables: { unitId: unit?.id },
    skip: !unit?.id,
  })

  return (
    <div className=" space-y-6">
  
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Technicians</h1>
        <AddTechnicianDialog />
      </div>
      <TechniciansTable data={data?.technicians || []} columns={columns} />
    </div>
  )
}
