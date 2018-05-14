const express = require('express');
const router = express.Router();
const ctrlStudents = require('../controllers/students');
//const ctrlReviews = require('../controllers/reviews');
 
// students
router
  .route('/students')
  .get(ctrlStudents.studentsList)
 // .post(ctrlLocations.locationsCreate);

/* 
router
  .route('/locations/:locationid')
  .get(ctrlLocations.locationsReadOne)
  .put(ctrlLocations.locationsUpdateOne)
  .delete(ctrlLocations.locationsDeleteOne);
 
// reviews
router
  .route('/locations/:locationid/reviews')
  .post(ctrlReviews.reviewsCreate);
 
router
  .route('/locations/:locationid/reviews/:reviewid')
  .get(ctrlReviews.reviewsReadOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);
  */
module.exports = router;