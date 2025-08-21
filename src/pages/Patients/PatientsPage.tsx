'use client'

import { useDialysisUnitStore } from '@/store/useDialysisUnitStore'
import { useSubscription, gql } from '@apollo/client'
import { AddPatientDialog } from './AddPatientDialog'
import { PatientsList } from './PatientsList'
import { GET_PATIENTS } from '@/gql/patients/patients.gql'




export default function PatientsPage() {
  const { selectedUnit } = useDialysisUnitStore()
  const { data } = useSubscription(GET_PATIENTS, {
    variables: { unitId: selectedUnit?.id },
    skip: !selectedUnit?.id,
  })

  if (!selectedUnit) return <p className="p-4">Please select a Dialysis Unit</p>

  return (
    <div className=" space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patients</h1>
        <AddPatientDialog  />
      </div>
      <PatientsList patients={data?.patients || []} />
    </div>
  )
}
