const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

moviesSchema.index({ title: 'text'});
moviesSchema.plugin(mongoosePaginate);
const Movie = mongoose.model('Movie', moviesSchema)
module.exports = Movie
