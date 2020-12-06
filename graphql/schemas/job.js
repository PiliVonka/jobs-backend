import { gql } from "apollo-server-express";

export default gql`
  type Job {
    id: ID!
    title: String!
    description: String!
    phone: String!
    location: String!
    created: String!
  }

  type Query {
    job(id: ID!): Job
    jobs(searchValue: String!): [Job!]!
  }

  type Mutation {
    addJob(title: String!, description: String!, phone: String!, location: String!): Job
  }
`;
