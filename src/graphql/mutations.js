/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCoach = /* GraphQL */ `
  mutation CreateCoach(
    $input: CreateCoachInput!
    $condition: ModelCoachConditionInput
  ) {
    createCoach(input: $input, condition: $condition) {
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
export const updateCoach = /* GraphQL */ `
  mutation UpdateCoach(
    $input: UpdateCoachInput!
    $condition: ModelCoachConditionInput
  ) {
    updateCoach(input: $input, condition: $condition) {
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
export const deleteCoach = /* GraphQL */ `
  mutation DeleteCoach(
    $input: DeleteCoachInput!
    $condition: ModelCoachConditionInput
  ) {
    deleteCoach(input: $input, condition: $condition) {
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
export const createSchool = /* GraphQL */ `
  mutation CreateSchool(
    $input: CreateSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    createSchool(input: $input, condition: $condition) {
      id
      schoolName
      postcode
      createdAt
      updatedAt
    }
  }
`;
export const updateSchool = /* GraphQL */ `
  mutation UpdateSchool(
    $input: UpdateSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    updateSchool(input: $input, condition: $condition) {
      id
      schoolName
      postcode
      createdAt
      updatedAt
    }
  }
`;
export const deleteSchool = /* GraphQL */ `
  mutation DeleteSchool(
    $input: DeleteSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    deleteSchool(input: $input, condition: $condition) {
      id
      schoolName
      postcode
      createdAt
      updatedAt
    }
  }
`;
