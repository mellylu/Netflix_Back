const express = require('express');
const cors = require('cors');
var port = process.env.PORT;
const apiRouter = require('../routes');
const { ApolloServer, gql } = require('apollo-server-express');

const MovieSchema = require('../apollo/schemas/movie.schema');
const movieResolvers = require('../apollo/resolvers/movie.resolver');

const app = express();

const graphQlServer = new ApolloServer({
    typeDefs: [MovieSchema],
    resolvers:[movieResolvers],
  })

//app.use(cors());

app.use('/api/v1/', apiRouter);

//écoute du port
exports.start = () => {
    app.listen(port, (err) => {
        if (err) {
            console.log(`Errors: ${err}`);
            process.exit(-1);
        }
        console.log(`app is runnning on port ${port}`);
    });
};