import { gql } from "@apollo/client";

export const GET_ALL_ORGANIZATIONS = gql`
  query GetAllOrganizations {
    organizations(order_by: { created_at: desc }) {
      id
      name
      logo
      email
      phone
      active
      deleted
      created_at
    }
  }
`;

export const GET_ALL_NOT_DELETED_ORGANIZATIONS = gql`
  subscription GetAllNotDeletedOrganizations {
    organizations(where: { deleted: { _eq: false } }, order_by: { created_at: desc }) {
      id
      name
      logo
      email
      phone
      active
      deleted
      created_at
    }
  }
`;

export const GET_DELETED_ORGANIZATIONS = gql`
  subscription GetDeletedOrganizations {
    organizations(where: { deleted: { _eq: true } }, order_by: { created_at: desc }) {
      id
      name
      logo
      email
      phone
      active
      deleted
      created_at
    }
  }
`;

export const GET_ORGANIZATION_BY_ID = gql`
  query GetOrganizationById($id: uuid!) {
    organizations_by_pk(id: $id) {
      id
      name
      logo
      email
      phone
      active
      deleted
      created_at
    }
  }
`;

export const UPDATE_ORGANIZATION = gql`
  mutation UpdateOrganization($id: uuid!, $changes: organizations_set_input!) {
    update_organizations_by_pk(pk_columns: { id: $id }, _set: $changes) {
      id
      name
      logo
      email
      phone
      active
      deleted
      created_at
    }
  }
`;

export const DELETE_ORGANIZATION = gql`
  mutation DeleteOrganization($id: uuid!) {
    update_organizations_by_pk(pk_columns: { id: $id }, _set: { deleted: true }) {
      id
      name
      logo
      email
      phone
      active
      deleted
      created_at
    }
  }
`;
export const RESTORE_ORGANIZATION = gql`
  mutation RestoreOrganization($id: uuid!) {
    update_organizations_by_pk(pk_columns: { id: $id }, _set: { deleted: false }) {
      id
      name
      logo
      email
      phone
      active
      deleted
      created_at
    }
  }
`;