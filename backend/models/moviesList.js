const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    year: {
        type: String,
    }
});

const Movie = mongoose.model('Movie', moviesSchema)
module.exports = Movie
