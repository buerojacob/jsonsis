const express = require('express');
const router = express.Router();
//const ctrlMain = require('../controllers/main');
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');
const ctrljsonsis = require('../controllers/jsonsis');



/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
const homepageController = function (req, res) {
  res.render('index', { title: 'Express' });
};*/

/* GET home page. */
/*router.get('/', homepageController);*/

/* GET home page. */
/*router.get('/', ctrlMain.index);*/


/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

 
/* Other pages */
router.get('/about', ctrlOthers.about);

/* jsonSIS pages */
//router.get('/jsonsis', ctrljsonsis.jsonsis_testpage);




module.exports = router;


 

 