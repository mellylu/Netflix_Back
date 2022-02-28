const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    age: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    type: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
});

module.exports = mongoose.model('Movie', movieSchema);