const Movie = require('../../models/movie.model');

module.exports = {
    Query: {
        getMovies:() => {
            return Movie.find().catch(err => console.log(err));
        },
        getMovie(parent, args) {
            return Movie.findById(args.id).catch(err => console.log(err));
        }
    },
    Mutation: {
        createMovie(parent, args) {
            const newMovie = new Movie(
                {
                    name: args.name,
                    age: args.age,
                    duration: args.duration,
                    type: args.type,
                    description: args.description,
                    img: args.img
                }
            )
            return newMovie.save();
        },
        updateMovie(parent, {id, name, age, duration, type, description, img}) {
            return Movie.findByIdAndUpdate(id, { name: name, age: age, duration: duration, type: type, description: description, img: img}).catch(err => console.log(err));
        },
        deleteMovie(parent, args){
            return Movie.findByIdAndDelete(args.id);
        }
    }
}