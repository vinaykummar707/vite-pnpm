import { gql } from "@apollo/client";

export const GET_STOP_AUDIOS_BY_STOP_ID = gql`
  subscription GetStopAudiosByStopId($stop_id: uuid!) {
    stop_audios(where: { stop_id: { _eq: $stop_id } }, order_by: { created_at: desc }) {
      id
      category
      duration
      file_name
      file_size
      language_code
      text
      url
      created_at
      deleted
      stop_id
    }
  }
`;

export const UPDATE_STOP_AUDIO = gql`
  mutation UpdateStopAudio($id: uuid!, $changes: stop_audios_set_input!) {
    update_stop_audios_by_pk(pk_columns: { id: $id }, _set: $changes) {
      id
      category
      duration
      file_name
      file_size
      language_code
      text
      url
      created_at
      deleted
      stop_id
    }
  }
`;

export const DELETE_STOP_AUDIO = gql`
  mutation DeleteStopAudio($id: uuid!) {
    update_stop_audios_by_pk(pk_columns: { id: $id }, _set: { deleted: true }) {
      id
      category
      duration
      file_name
      file_size
      language_code
      text
      url
      created_at
      deleted
      stop_id
    }
  }
`;

export const GET_STOP_AUDIOS_BY_STOP_ID_AND_CATEGORY = gql`
  query GetStopAudiosByStopIdAndCategory($stop_id: uuid!, $category: String!) {
    stop_audios(
      where: {
        stop_id: { _eq: $stop_id }
        category: { _eq: $category }
      }
      order_by: { created_at: desc }
    ) {
      id
      category
      duration
      file_name
      file_size
      language_code
      text
      url
      created_at
      deleted
      stop_id
    }
  }
`;
