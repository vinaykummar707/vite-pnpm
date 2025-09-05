'use client'

import { useDialysisUnitStore } from '@/store/useDialysisUnitStore'
import { useSubscription, gql } from '@apollo/client'
import { AddPatientDialog } from './AddPatientDialog'
import { PatientsList } from './PatientsList'
import { GET_PATIENTS } from '@/gql/patients/patients.gql'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'




export default function PatientsPage() {
  const { selectedUnit } = useDialysisUnitStore()
  const { data } = useSubscription(GET_PATIENTS, {
    variables: { unitId: selectedUnit?.id },
    skip: !selectedUnit?.id,
  })

  if (!selectedUnit) return <p className="p-4">Please select a Dialysis Unit</p>

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patients</h1>
        <AddPatientDialog  />
      </div>
      <div className="flex justify-between items-center">
        <Input className='bg-white  shadow-none  focus:outline-0 ' placeholder="Search patients..." />
        <Button  >
          <Filter />
          Filter
        </Button>
        
      </div>
      <PatientsList patients={data?.patients || []} />
    </div>
  )
}
