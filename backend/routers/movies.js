const express = require('express');
const MoviesController = require('../controllers/movies-controller');
const movies_controller = new MoviesController();
const router = new express.Router();

router.get('/getMoviesList', movies_controller.getMoviesList);
router.get('/getPaginatedMovies', movies_controller.getPaginatedMovies);

/**
 * @swagger
 *
 * /movies/newItem:
 *   post:
 *     summary: add movie
 *     description: add new movie
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  properties:
 *                      title:
 *                          type: string
 *                          description: title of the movie
 *                      description:
 *                          type: string
 *                          description: description of the movie
 *                      year:
 *                          type: string
 *                          description: year of the movie
 *      response:
 *          201:
 *              description: movie added successfully
 *          422:
 *              description: movie already exists
 */
router.post('/newItem', movies_controller.newItem);


router.delete('/deleteItem', movies_controller.deleteItem);
router.patch('/changeItem', movies_controller.changeItem);

module.exports = router;
