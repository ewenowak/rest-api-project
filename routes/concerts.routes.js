const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');


router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getConcertById);

router.post('/concerts', ConcertController.postNewConcert);

router.put('/concerts/:id', ConcertController.putConcertById);

router.delete('/concerts/:id', ConcertController.deleteConcert);  

module.exports = router;