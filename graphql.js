import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
type Food {
  id: ID!
  name: String
  prepTime: String
  origin: String
  userId: Int
}

type User {
  id: ID!
  firstName: String
  lastName: String
  age: Int
  location: String
  favoriteFoods: [Food]
}

 type Query {
  users: [User]
  user(id: ID!): User
 }
`;

const foods = [
  {
    id: 1,
    name: 'Spaghetti',
    prepTime: '10mins',
    origin: 'Africa',
    userId: 3,
  },
  {
    id: 2,
    name: 'Rice',
    prepTime: '10mins',
    origin: 'Africa',
    userId: 1,
  },
  {
    id: 3,
    name: 'Hamburger',
    prepTime: '15mins',
    origin: 'Germany',
    userId: 1,
  },
];

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

  User: {
    favoriteFoods: (parent) => {
      return foods.filter((food) => food.userId === parent.id);
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
