const Movies = require('../models/moviesList');
const mongoose = require('mongoose');
const moviesList = mongoose.model('Movie');
const ObjectId = require('mongodb').ObjectID;

class MoviesController {
    constructor(){}
    getMoviesList = async (req, res) => {
        moviesList.find((err, docs) => {
            if (err) {
                res.send(err);
            } else {
                res.send(docs);
            }
        })
    };
    newItem = async (req, res) => {
        const item = new moviesList()
            item.name = req.body.item.name,
            item.description = req.body.item.description,
            item.options = req.body.item.options,
        item.save()
    };
    deleteItem = async (req, res) => {
        const id = req.query.id;
        const o_id = new ObjectId(id);
        moviesList.deleteOne({ _id: o_id }, function(err, result) {
            if (err) {
                res.send('err');
            } else {
                res.send('result');
            }
        });
    };
}

module.exports = MoviesController;
