const mongoose = require('mongoose');
const studMod = mongoose.model('studentModel')

const queryjson_ctrl = {
		condition: {'studentIdentifier': 'testStudent-000001-X'}, 
		projection: 'gradesSemester'
	}; 

const studentsList = function (req, res) { 
	studMod.find(queryjson_ctrl.condition, queryjson_ctrl.projection ,function(error,docs){
	res
    .status(200)
    .json(docs)});
   };

const studentsCreate = function (req, res) {  };

const studentsReadOne = function (req, res) { };

const studentsUpdateOne = function (req, res) { };

const studentsDeleteOne = function (req, res) { };

module.exports = {
  studentsList,
  studentsCreate,
  studentsReadOne,
  studentsUpdateOne,
  studentsDeleteOne
};