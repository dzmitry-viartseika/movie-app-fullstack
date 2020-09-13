const express = require('express');
const MoviesController = require('../controllers/movies-controller');
const movies_controller = new MoviesController();
const router = new express.Router();

router.post('/newItem', movies_controller.newItem);

module.exports = router;
