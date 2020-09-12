const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

/**
 * @swagger
 *
 * definitions:
 *   Movie:
 *     type: object
 *     required:
 *       - title
 *       - description
 *       - year
 *     properties:
 *       title:
 *         type: string
 *         description: title label
 *       description:
 *         type: string
 *         description: description label
 *       year:
 *         type: string
 *         description: year label
 */
const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: String,
        required: true,
        trim: true,
    },
    created: { type: Date, default: Date.now }
});

moviesSchema.index({ title: 'text'});
moviesSchema.plugin(mongoosePaginate);
const Movie = mongoose.model('Movie', moviesSchema)
module.exports = Movie
