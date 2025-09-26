import { gql } from "@apollo/client";

export const ADD_STOP = gql`
  mutation AddStop($object: stops_insert_input!) {
    insert_stops_one(object: $object) {
      name
      route_id
      down_latitude
      down_longitude
      up_latitude
      up_longitude
    }
  }
`;

export const GET_ALL_STOPS = gql`
  query GetAllStops {
    stops(order_by: { created_at: desc }) {
      id
      name
      route_id
      deleted
      down_latitude
      down_longitude
      up_latitude
      up_longitude
      created_at
    }
  }
`;

export const GET_ALL_NOT_DELETED_STOPS = gql`
  subscription GetAllNotDeletedStops {
    stops(where: { deleted: { _eq: false } }, order_by: { created_at: desc }) {
      id
      route_id
      deleted
      down_latitude
      down_longitude
      up_latitude
      up_longitude
      created_at
    }
  }
`;

export const GET_DELETED_STOPS = gql`
  subscription GetDeletedStops {
    stops(where: { deleted: { _eq: true } }, order_by: { created_at: desc }) {
      id
      route_id
      deleted
      down_latitude
      down_longitude
      up_latitude
      up_longitude
      created_at
    }
  }
`;

export const GET_STOP_BY_ID = gql`
  query GetStopById($id: uuid!) {
    stops_by_pk(id: $id) {
      id
      route_id
      deleted
      down_latitude
      down_longitude
      up_latitude
      up_longitude
      created_at
    }
  }
`;

export const UPDATE_STOP = gql`
  mutation UpdateStop($id: uuid!, $changes: stops_set_input!) {
    update_stops_by_pk(pk_columns: { id: $id }, _set: $changes) {
      id
      route_id
      deleted
      down_latitude
      down_longitude
      up_latitude
      up_longitude
      created_at
    }
  }
`;

export const DELETE_STOP = gql`
  mutation DeleteStop($id: uuid!) {
    update_stops_by_pk(pk_columns: { id: $id }, _set: { deleted: true }) {
      id
      route_id
      deleted
      down_latitude
      down_longitude
      up_latitude
      up_longitude
      created_at
    }
  }
`;

export const RESTORE_STOP = gql`
  mutation RestoreStop($id: uuid!) {
    update_stops_by_pk(pk_columns: { id: $id }, _set: { deleted: false }) {
      id
      route_id
      deleted
      down_latitude
      down_longitude
      up_latitude
      up_longitude
      created_at
    }
  }
`;