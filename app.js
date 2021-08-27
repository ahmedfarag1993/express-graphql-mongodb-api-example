const express = require('express');
const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql');

const schema = require('./schema');

const app = express();

// connect to DB
mongoose.connect('mongodb+srv://USER_NAME:PASSWORD@testcluster.kkm1b.mongodb.net/DB_NAME?retryWrites=true&w=majority',
    {useNewUrlParser: true});
mongoose.connection.on('open', err => {
    console.log('connected to database successfully');
});
mongoose.connection.on('error', err => {
    console.error(`Error : ${err}`);
});
mongoose.set('debug', true);


// graphQL Root Query
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('server running on port 4000, press http://localhost:4000/graphql');
})
