const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movie = require('./movie.model');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    }  ,
    favoris:[
        {
            movie: {
                type: Schema.Types.ObjectId,
                ref: Movie
            }
        }
    ]  
});

module.exports = mongoose.model('User', userSchema);