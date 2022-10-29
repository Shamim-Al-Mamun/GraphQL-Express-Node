const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const axios = require("axios");

const app = express();

let message = "This is a message" ;

const schema = buildSchema(`

    type Post {
        userId : Int
        id :Int
        title : String
        body: String
    }

    type User {
        name : String
        age : Int
        college : String
    }
    
    type Query {
        test : String
        welcomeMessage(name : String, dayOfWeek : String!): String
        getUser : User
        getUsers : [User]
        getPostsFromExternalAPI : [Post]
        message : String
    }
    input UserInput {
        name: String!
        age: Int!
        college: String!
    }

    type Mutation {
        setMessage(newMessage: String) : String
        createUser(user : UserInput) : User
    }

`);

const root = {
  test: () => {
    return "Hello  World";
  },
  welcomeMessage: (args) => {
    return `hey, humans from ${args.name}, today is ${args.dayOfWeek}`;
  },
  getUser: () => {
    const user = {
      name: "Al Mamun",
      age: 27,
      college: "Notre Dame",
    };
    return user;
  },
  getUsers: () => {
    const users = [
      {
        name: "Al Mamun",
        age: 27,
        college: "Notre Dame",
      },
      {
        name: "Md Shamim",
        age: 28,
        college: "Dhaka college",
      },
    ];
    return users;
  },
  getPostsFromExternalAPI: async () => {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return result?.data;
  },
  setMessage: ({newMessage}) =>{
    message = newMessage;
    return message
  }, 
  message : () =>{
    return message
  },
  createUser : (args) =>{
    
    return args.user
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server  is running at http://localhost:${PORT}`);
});

// Resource : https://www.youtube.com/watch?v=dJjP0SbdIt0

//https://www.youtube.com/watch?v=xUQ-hNRHCgs
