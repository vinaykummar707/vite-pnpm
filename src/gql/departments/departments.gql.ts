import { gql, useQuery, useSubscription } from '@apollo/client';

export const GET_DEPARTMENTS = gql`
    subscription GetDepartments($unitId: uuid!) {
        departments(where: { dialysis_unit_id: { _eq: $unitId }, deleted_at: { _is_null: true } }, order_by: { created_at: desc }) {
            id
            name
        }
    }
`;


export const ADD_DEPARTMENT = gql`
mutation AddDepartment($object: departments_insert_input!) {
  insert_departments_one(object: $object) {
    id
  }
}
`;

export const DELETE_DEPARTMENT = gql`
  mutation deleteDepartment($id: uuid!, $deletedAt: timestamp!) {
    update_departments_by_pk(
      pk_columns: { id: $id }
      _set: { deleted_at: $deletedAt }
    ) {
      id
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
mutation UpdateDepartment($id: uuid!, $object: departments_set_input!) {
  update_departments_by_pk(pk_columns: { id: $id }, _set: $object) {
    id
  }
}
`;

