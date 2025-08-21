import { gql } from "@apollo/client";

export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($id: uuid!, $object: patients_set_input!) {
    update_patients_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
    }
  }
`;

export const ADD_PATIENT = gql`
mutation AddPatient($object: patients_insert_input!) {
  insert_patients_one(object: $object) {
    id
  }
}
`;


export const DELETE_PATIENT = gql`
mutation deletePatient($id: uuid!, $deletedAt: timestamp!) {
  update_patients_by_pk(
    pk_columns: { id: $id }
    _set: { deleted_at: $deletedAt }
  ) {
    id
  }
}
`;

export const GET_PATIENTS = gql`
subscription GetPatients($unitId: uuid!) {
  patients(
    where: { dialysis_unit_id: { _eq: $unitId }, deleted_at: { _is_null: true } }
    order_by: { created_at: asc }
  ) {
   id
    name
    age
    gender
    phone
    email
    set_usage
    dialysis_frequency
    dialyser
    payment_mode
  }
}
`
