const express = require('express');
const MoviesController = require('../controllers/movies-controller');
const movies_controller = new MoviesController();
const router = new express.Router();

// Routes
/**
 * @swagger
 * /getMoviesList:
 *  get:
 *      get all movies
 *      responses:
 *        '200':
 *          description: A succesfull response
 *
 *
 *
 */

router.get('/getMoviesList', movies_controller.getMoviesList);
router.get('/getPaginatedMovies', movies_controller.getPaginatedMovies);
router.post('/newItem', movies_controller.newItem);
router.delete('/deleteItem', movies_controller.deleteItem);
router.patch('/changeItem', movies_controller.changeItem);

module.exports = router;
