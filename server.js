const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

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

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(cors(corsOptions));

//Set up JwT Authentication Middleware
app.use(async (req, res, next) => {
    const token = req.headers['authorization'];
    if(token !== 'null') {
        try {
            const currentUser = await jwt.verify(token, process.env.SECRET);
            req.currentUser = currentUser;
        } catch (err) {
            console.error(err);
        }
    }
    next();
});

//Connect Schemas with GraphQL
app.use('/graphql', bodyParser.json(), graphqlExpress(({ currentUser }) => ({
    schema, 
    context: {
        Recipe,
        User,
        currentUser
    }
}))
);

//Create GraphiQL Application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`);
});