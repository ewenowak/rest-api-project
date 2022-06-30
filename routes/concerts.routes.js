const express = require('express');
const { MongoTimeoutError } = require('mongodb/lib/core');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');
const { route } = require('./testimonials.routes');


router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getConcertById);

router.get('/concerts/performer/:performer', ConcertController.getConcertByPerformer);

router.get('/concerts/genre/:genre', ConcertController.getConcertByGenre);

router.get('/concerts/price/:price_min/:price_max', ConcertController.getConcertByPrice);

router.get('/concerts/day/:day', ConcertController.getConcertByDay);

router.post('/concerts', ConcertController.postNewConcert);

router.put('/concerts/:id', ConcertController.putConcertById);

router.delete('/concerts/:id', ConcertController.deleteConcert);  

module.exports = router;