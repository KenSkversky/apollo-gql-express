const express = require( 'express' );
const { ApolloServer } = require( 'apollo-server-express');
const mongoose = require( 'mongoose' );

const dotenv = require('dotenv');
dotenv.config();

const typeDefs = require( './typeDefs');
const resolvers = require( './resolvers')

const { PORT, DB_URI, DB_NAME } = process.env;

// async function startServer() {
    const startServer = async () => {
    const app = express();
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });
// Mongo
    await mongoose.connect( DB_URI,
    { 
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    );
    console.log( 'MongoDB Connected - ', DB_NAME);

    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app })
    app.use(( req, res ) => {
        res.send( "Hello World")
    });
    app.listen( PORT || 4001, () => console.log( `Apollo Express Server started on Port ${ PORT }`));
} 
startServer();