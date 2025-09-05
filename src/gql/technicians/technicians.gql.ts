import { gql } from "@apollo/client";

export const GET_TECHNICIANS = gql`
  subscription GetTechnicians($unitId: uuid!) {
    technicians(
      where: { dialysis_unit_id: { _eq: $unitId }, deleted_at: { _is_null: true } }
      order_by: { created_at: desc }
    ) {
      id
      name
      email
      phone
    }
  }
`