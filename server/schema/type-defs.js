const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheatres: Boolean!
  }

  type Query {
    users: UserResult
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = INDIAN
  }

  input updateUsernameInput {
    id: ID!
    newUsername: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUsername(input: updateUsernameInput!): User
    deleteUser(id: ID!): User
  }

  enum Nationality {
    INDIAN
    AMERICAN
    CHINESE
    JAPANESE
    GERMAN
  }

  type UserSuccess {
    users: [User!]!
  }

  type UserError {
    message: String!
  }

  union UserResult = UserSuccess | UserError
`;

module.exports = { typeDefs };
