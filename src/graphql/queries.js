/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCoach = /* GraphQL */ `
  query GetCoach($id: ID!) {
    getCoach(id: $id) {
      id
      firstName
      secondName
      sport
      coachingCerts
      introduction
      postcode
      createdAt
      updatedAt
    }
  }
`;
export const listCoachs = /* GraphQL */ `
  query ListCoachs(
    $filter: ModelCoachFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoachs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        secondName
        sport
        coachingCerts
        introduction
        postcode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSchool = /* GraphQL */ `
  query GetSchool($id: ID!) {
    getSchool(id: $id) {
      id
      schoolName
      postcode
      createdAt
      updatedAt
    }
  }
`;
export const listSchools = /* GraphQL */ `
  query ListSchools(
    $filter: ModelSchoolFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchools(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        schoolName
        postcode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
