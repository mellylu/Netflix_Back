const { gql } = require('apollo-server');

module.exports = gql`
    type Movie {
        id: ID
        name: String
        age: String
        duration: String,
        type: String,
        description: String,
        image: String
    }
    type Query {
        getMovies:[Movie]
        getMovie(id:ID):Movie!
    }
    type Mutation {
        createMovie(name: String!, age: String, duration: String, type: String, description: String, img:String):Movie
        updateMovie(id:ID!,name:String!,age:String,duration:String,type:String,description:String,img:String):Movie
        deleteMovie(id:ID!):Movie
    }

`
//deleteMovie fonctionne mais affiche une erreur
//depuis graphql, register, update et delete ne fonctionne plus