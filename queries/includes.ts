import { gql } from '@apollo/client';

export const GET_INCLUDES = gql`
  query Includes($height_in: [Int!]) {
    extrinsics(where: { block: { height_in: $height_in } }) {
      id
      block {
        height
      }
    }
    events(where: { block: { height_in: $height_in } }) {
      id
      block {
        height
      }
    }
  }
`;
