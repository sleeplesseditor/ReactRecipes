const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config({ path: './variables.env' });

const Recipe = require('./models/Recipe');
const User = require('./models/User');

//Bring in GraphQL Express Middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

//Create Schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

//Connect to MLab database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB Connected')
    })
    .catch(err => console.error(err));

//Initialize App Server
const app = express();

//Create GraphiQL Application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

//Connect Schemas with GraphQL
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema, 
    context: {
        Recipe,
        User
    }
}));

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`);
});