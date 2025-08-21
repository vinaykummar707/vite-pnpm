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


export const DELETE_MACHINE = gql`
mutation SoftDeleteMachine($id: uuid!, $deletedAt: timestamptz!) {
  update_machines_by_pk(pk_columns: { id: $id }, _set: { deleted_at: $deletedAt }) {
    id
  }
}
`
