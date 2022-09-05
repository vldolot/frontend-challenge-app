import { gql } from '@apollo/client';

export const GET_BLOCKS = gql`
  query Blocks {
    blocks(limit: 15, orderBy: height_DESC) {
      id
      height
      timestamp
    }
  }
`;
