const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');


const app = express();


const schema = buildSchema(`
    
    type Query {
        test : String
        welcomeMessage(name : String, dayOfWeek : String!): String
    }

`)

const root = {

    test : () =>{

        return "Hello  World";

    },
    welcomeMessage : (args) =>{
        return `hey, humans from ${args.name}, today is ${args.dayOfWeek}` 
    }

}

app.use(
    '/graphql',
    graphqlHTTP({
        graphiql:true,
        schema: schema,
        rootValue:root
    })
)


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


// Resource : https://www.youtube.com/watch?v=dJjP0SbdIt0