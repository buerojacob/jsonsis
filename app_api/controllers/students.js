const mongoose = require('mongoose');
const studMod = mongoose.model('studentModel')
const util = require('util')



const studentsList = function (req, res) { 
	studMod.find(function(error,docs){
	res
    .status(200)
    .json(docs)});
   };

const studentsCreate = function (req, res) {  };

//JSON POST Body: http://localhost:3000/api/students/readOne
//{"condition":{"studentIdentifier":"testStudent-000001-X"},"projection":"gradesSemester"}
//type -> application/json -> apps.js row 33 -> app.use(bodyParser.json());

const studentsReadOne = function (req, res) { 
  console.log(req.body); 
  console.log(req.body.condition); 
  console.log(req.body.condition.studentIdentifier);
  console.log(req.body.projection);
      studMod
        .find(req.body.condition)
        .select(req.body.projection)
        .exec((error,docs) => {
              res
                .status(200)
                .json(docs);
              }
              );
   };

const studentsUpdateOne = function (req, res) { };

const studentsDeleteOne = function (req, res) { };

module.exports = {
  studentsList,
  studentsCreate,
  studentsReadOne,
  studentsUpdateOne,
  studentsDeleteOne
};