const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller')


router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getSeatById);

router.post('/seats', SeatController.postNewSeat);

router.put('/seats/:id', SeatController.putSeatById);

router.delete('/seats/:id', SeatController.deleteSeat);  

module.exports = router;