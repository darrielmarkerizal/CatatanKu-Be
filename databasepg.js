const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { Client } = require("pg");
const { sequelize, Note } = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Markerizal26",
    database: "note-taking",
});

async function startServer() {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: { sequelize, Note },
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(
            `Server ready at http://localhost:4000${server.graphqlPath}`
        )
    );
}

startServer();
