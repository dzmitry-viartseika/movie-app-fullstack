const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    options: [
        {
        size:  {
            type: String,
        },
        price: {
            type: String,
        },
    }
    ]
});

const Movie = mongoose.model('Movie', moviesSchema)
module.exports = Movie
