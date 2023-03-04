import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
type User {
  id: ID!
  firstName: String
  lastName: String
  age: Int
  location: String
}

 type Query {
  users: [User]
  user(id: ID!): User
 }
`;

const users = [
  {
    id: 1,
    firstName: 'Victor',
    lastName: 'John',
    age: 22,
    location: 'New york',
  },
  {
    id: 2,
    firstName: 'Lucia',
    lastName: 'Kennedy',
    age: 32,
    location: 'London',
  },
  {
    id: 3,
    firstName: 'Benson',
    lastName: 'Mathew',
    age: 50,
    location: 'Austria',
  },
];

const resolvers = {
  Query: {
    users: () => {
      return users;
    },

    user: (parent, args) => {
      return users.find((user) => user.id === parseInt(args.id));
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`Server started at ${url}`);
