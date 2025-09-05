import { gql } from "@apollo/client";
export const GET_MACHINES = gql`
  subscription GetMachines($unitId: uuid!) {
    machines(
      where: { dialysis_unit_id: { _eq: $unitId }, deleted_at: { _is_null: true } }
      order_by: { created_at: asc }
    ) {
      id
      name
      is_occupied
      patient_id
    }
  }
`
export const GET_AVAILABLE_MACHINES = gql`
  subscription GetAvailableMachines($unitId: uuid!) {
    machines(
      where: {
        dialysis_unit_id: { _eq: $unitId },
        is_occupied: { _eq: false },
        deleted_at: { _is_null: true }
      }
      order_by: { created_at: asc }
    ) {
      id
      name
    }
  }
`

export const UPDATE_MACHINE = gql`
mutation UpdateMachine($id: uuid!, $name: String!, $is_occupied: Boolean!) {
  update_machines_by_pk(
    pk_columns: { id: $id }
    _set: { name: $name, is_occupied: $is_occupied }
  ) {
    id
  }
}
`

export const OCCUPY_MACHINE = gql`
  mutation OccupyMachine($id: uuid!, $patientId: uuid!) {
    update_machines_by_pk(
      pk_columns: { id: $id }
      _set: { is_occupied: true, patient_id: $patientId }
    ) {
      id
    }
  }
`

export const FREE_MACHINE = gql`
  mutation FreeMachine($id: uuid!) {
    update_machines_by_pk(
      pk_columns: { id: $id }
      _set: { is_occupied: false, patient_id: null }
    ) {
      id
    }
  }
`



export const DELETE_MACHINE = gql`
mutation SoftDeleteMachine($id: uuid!, $deletedAt: timestamptz!) {
  update_machines_by_pk(pk_columns: { id: $id }, _set: { deleted_at: $deletedAt }) {
    id
  }
}
`
export const MACHINE_STATS_QUERY = gql`
  query MachineStats($dialysisUnitId: uuid!) {
    occupied: machines_aggregate(
      where: {
        _and: [
          { dialysis_unit_id: { _eq: $dialysisUnitId } }
          { is_occupied: { _eq: true } }
          { patient_id: { _is_null: false } }
        ]
      }
    ) {
      aggregate { count }
    }
    free: machines_aggregate(
      where: {
        _and: [
          { dialysis_unit_id: { _eq: $dialysisUnitId } }
          {
            _or: [
              { is_occupied: { _eq: false } }
              { patient_id: { _is_null: true } }
            ]
          }
        ]
      }
    ) {
      aggregate { count }
    }
    total: machines_aggregate(
      where: { dialysis_unit_id: { _eq: $dialysisUnitId } }
    ) {
      aggregate { count }
    }
  }
`;