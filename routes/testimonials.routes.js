const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller')


router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/:id', TestimonialController.getTestimonialById);

router.get('/testimonials/random', TestimonialController.getRandomTestimonial);

router.post('/testimonials', TestimonialController.postNewTestimonial);

router.put('/testimonials/:id', TestimonialController.putTestimonialById);

router.delete('/testimonials/:id', TestimonialController.deleteTestimonial); 

module.exports = router;