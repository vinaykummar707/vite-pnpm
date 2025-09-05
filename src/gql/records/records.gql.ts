import { gql } from "@apollo/client";

export const ADD_DIALYSIS_RECORD = gql
  `mutation InsertDialysisRecord($object: dialysis_records_insert_input!) {
  insert_dialysis_records_one(object: $object) {
    id
    created_at
  }
}
  `

export const GET_DIALYSIS_RECORDS_BY_DATE = gql`
  subscription GetDialysisRecordsByDate($unitId: uuid!, $date: date!) {
    dialysis_records(
      where: {
        dialysis_unit_id: { _eq: $unitId }
        _and: { created_date: {_eq: $date} }
      }
      order_by: { created_at: desc }
    ) {
      id
      patient{
      id
      name
      set_usage
      email
      }
      dialysis_unit_id
      machine {
        id
        name
      }
      department{
        id
        name
      }
        technician{
        id
        name
        email
        }
      pre_weight
      post_weight
      weight_gain
      ended_at
      uf_goal
      created_at
      hours
      minutes
      started_at
       set_usage
    }
  }
`;

export const GET_DIALYSIS_RECORD_DETAILS_BY_ID = gql`
  subscription GetDialysisRecordDetailsById($recordId: uuid!) {
    dialysis_records_by_pk(id: $recordId) {
      id
      patient {
        id
        name
        email
        set_usage
      }
      dialysis_unit_id
      machine {
        id
        name
      }
      department {
        id
        name
      }
      technician {
        id
        name
        email
      }
      pre_weight
      post_weight
      weight_gain
      ended_at
      uf_goal
      created_at
      hours
      minutes
      started_at
      set_usage
    }
  }
`;


export const UPDATE_STARTED_AT = gql`
  mutation UpdateStartedAt($id: uuid!) {
    update_dialysis_records_by_pk(
      pk_columns: { id: $id }
      _set: { started_at: "now()" }
    ) {
      id
      started_at
    }
  }
`;


export const UPDATE_ENDED_AT = gql`
  mutation UpdateStartedAt($id: uuid!) {
    update_dialysis_records_by_pk(
      pk_columns: { id: $id }
      _set: { ended_at: "now()" }
    ) {
      id
      started_at
    }
  }
`;
