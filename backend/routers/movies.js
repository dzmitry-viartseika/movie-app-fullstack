const express = require('express');
const MoviesController = require('../controllers/movies-controller');
const movies_controller = new MoviesController();
const router = new express.Router();

router.get('/getMoviesList', movies_controller.getMoviesList);
router.post('/newItem', movies_controller.newItem);
router.delete('/deleteItem', movies_controller.deleteItem);
router.patch('/changeItem', movies_controller.changeItem);

module.exports = router;
