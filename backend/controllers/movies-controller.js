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
            item.title = req.body.movie.title,
            item.description = req.body.movie.description,
            item.year = req.body.movie.year,
        item.save()
        console.log('item', item);
        res.send(item);
        res.status(204).end()
    };
    deleteItem = async (req, res) => {
        const id = req.query.id;
        const o_id = ObjectId(id);
        moviesList.deleteOne({ _id: o_id }, function(err, result) {
            if (err) {
                res.send('err');
            } else {
                res.send('result');
            }
        });
    };
    changeItem = async (req,res) => {
        console.log('req', req.body);
        console.log('req.query.id', req.query.id);
        moviesList.findOneAndUpdate({_id: req.query.id}, {$set:
                {title: req.body.movie.title, description: req.body.movie.description, year: req.body.movie.year}
        },function(err, doc){
            console.log('doc', doc)
            if (err) {
                res.send('err');
            } else {
                res.send('result');
            }
        });
    };
}

module.exports = MoviesController;
