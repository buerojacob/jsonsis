const mongoose = require('mongoose');


const studentLifeCycleSchema = new mongoose.Schema({
	/*https://de.slideshare.net/RobJonkers/sap-student-lifecycle-management-overview-november-2017*/
	entryStatus: [{description: String, value: String, lastChange: {type: Date, 'default': Date.now}}],
	enrollmentStatus: [{description: String, value: String, lastChange: {type: Date, 'default': Date.now}}],
	gradeStatus: [{description: String, value: String, lastChange: {type: Date, 'default': Date.now}}],
	alumniStatus: [{description: String, value: String, lastChange: {type: Date, 'default': Date.now}}]
	});

const personDataSchema = new mongoose.Schema({
	officialName: {
		type: String,
		/*required: true*/},
	firstName: String,
	dateOfBirth: Date,
	sex: String	
});

const adressDataSchema = new mongoose.Schema({
	adressLine1: String,
	adressLine2: String,
	street: String,
	houseNumber: String,
	swissZipCode: Number,
	town: String,
	locality: String
});

const disabilityCompensationSchema = new mongoose.Schema({
	description: String,
	medicalIndicator: String,
	facilitations: String
});

const memberOfSchema = new mongoose.Schema({
	/* see http://mongoosejs.com/docs/populate.html*/
	entryCourseClasses: [{entryCourseClassesIdentifier: String}],
	entryExamClasses: [{entryExamClassesIdentifier: String}],
	gradeCourseClasses: [{gradeCourseClassesIdentifier: String}],
	gradeExamClasses: [{gradeExamClassesIdentifier: String}]
});

const gradeElementSchema = new mongoose.Schema({
	subject: String, 
	gradeValueQualifier: {
		type: Number,
		'default': 0,
		min: 0,
		max: 6	}, 
	absentsExcused: Number, 
	absentsUnexcused: Number
});

const gradeSemesterSchema = new mongoose.Schema({
	courseID: String,
	schoolYear: String, 
	schoolSemester: String,
	gradeElements: [gradeElementSchema],
	gradeValueQualifierAverage: Number,
	absentsExcusedTotal: Number, 
	absentsUnexcusedTotal: Number, 
	gradeLevel: {type: String,'default': 'promoviert'}
});

const relationshipSchema = new mongoose.Schema({
	function: String, 
	institutionName: String, 
	institutionDepartment: String, 
	adressData: adressDataSchema});

const studentSchema = new mongoose.Schema({ 
	studentIdentifier: String,
	graduationPlan: [{course: String}],
	studentLifeCycle: studentLifeCycleSchema,
	personData: personDataSchema,
	adressData: adressDataSchema,
	disabilityCompensation: disabilityCompensationSchema,
	relationships: [relationshipSchema],
	memberOf: memberOfSchema,
	absenceTracker: [{eventID: String, number: Number}],
	gradesSemester: [gradeSemesterSchema],
	onGoingComment: String
});

//const student = mongoose.model('student', studentSchema);

const studentModel = mongoose.model('studentModel', studentSchema, 'students')

const student_1 = new studentModel({

studentIdentifier: 'testStudent-000001',

graduationPlan: [{course: 'EAE'}, {course: 'BM1.T'} ],

studentLifeCycle: {
		entryStatus: [{description: 'mitPruefung', value: 'DFME-GKK-mrz', lastChange:'2018-01-28'},
		              {description: 'Pruefungsergebnis', value: 'bestanden', lastChange:'2018-03-09'}],
		enrollmentStatus: [{description: 'Aufnahmeentscheid', value: 'aufgenommen', lastChange:'2018-03-18'},
						   {description: 'kantonaleZuteilung', value: 'gibb', lastChange:'2018-03-18'}],
		gradeStatus: [{description: 'Status', value: 'inPlanung', lastChange:'2018-03-18'}],
		alumniStatus: [{description: '-', value: '-', lastChange:'2018-03-18'}]
	},

personData: {
		officialName: 'Jacob-Test1',
		firstName: 'Claude',
		dateOfBirth: '1956-07-02',
		sex: 'm'},
adressData: {
		adressLine1: '-',
		adressLine2: '-',
		street: 'Höheweg',
		houseNumber: '46',
		swissZipCode: '3626',
		town: 'Hünibach',
		locality: 'Kanton Bern'},

disabilityCompensation : {
	description: 'Leseschwäche',
	medicalIndicator: 'Artztzeugnis PH/MBA bestätigt',
	facilitations: 'Zeitzuschschlag Sprachfächer Semestertests und Prüfungen plus 30%'
},

relationships: {function: 'Berufskunde', institutionName: 'gibb', institutionDepartment: 'MTB-Klasse-7b', 
	adressData: {
		adressLine1: '-',
		adressLine2: '-',
		street: 'xxxxx',
		houseNumber: 'xx',
		swissZipCode: '3626',
		town: 'xxxxx',
		locality: 'xxxxxxx'}},

memberOf: {
	entryCourseClasses: [{entryCourseClassesIdentifier: 'EA.2016.E4a'}, {entryCourseClassesIdentifier: 'VKP.2017.Xa'}],
	entryExamClasses: [{entryExamClassesIdentifier: 'ARTE.2018.201'}, {entryExamClassesIdentifier: 'ARTE.2018.251'}],
	gradeCourseClasses: [{gradeCourseClassesIdentifier: '-'}],
	gradeExamClasses: [{gradeExamClassesIdentifier: '-'}]
},

absenceTracker: [{eventID: 'event-0001', number: 3}, {eventID: 'event-0002', number: 1}],

gradesSemester: 
	 [{schoolYear: '17/18', schoolSemester: 'HS', gradeElements: [{subject: 'Deutsch', gradeValueQualifier: 4.5, absentsExcused: 4, absentsUnexcused: 0}, 
	 {subject: 'Mathematik', gradeValueQualifier: 5.0, absentsExcused: 2, absentsUnexcused: 0}], 
	 gradeValueQualifierAverage: 4.8, absentsExcusedTotal: 6, absentsUnexcusedTotal: 0, gradeLevel: 'promoviert'}, 
	  {schoolYear: '17/18', schoolSemester: 'FS', gradeElements: [{subject: 'Deutsch', gradeValueQualifier: 4.0, absentsExcused: 6, absentsUnexcused: 0}, 
	  {subject: 'Mathematik', gradeValueQualifier: 5.5, absentsExcused: 4, absentsUnexcused: 0}], 
	  gradeValueQualifierAverage: 5.0, absentsExcusedTotal: 10, absentsUnexcusedTotal: 0, gradeLevel: 'promoviert'}],

onGoingComment: 'Test Kommentar'
});


student_1.save(function (err,docs) {
	if (err) return console.log(err);
	//console.log(docs);
})

const util = require ('util');

/*studentModel.findOne(function(error,docs){
		//console.log(error);
		console.log(docs,util.inspect(docs, { depth: 6}));
	})*/


/*studentModel.findById('5af9ad2b61e97e2b94e5845b', 'studentIdentifier').exec(function(error,docs){
		//console.log(error);
		console.log(docs,util.inspect(docs, { depth: 6}));
	});*/

const queryjson = {
		condition: {'studentIdentifier': 'testStudent-000001-X'}, 
		projection: 'gradesSemester'
	}; 

/*
const queryjson2 = {
		condition: {'studentIdentifier': 'testStudent-000001-X'}, 
		projection: null
	}; 
	*/

studentModel.find(queryjson.condition, queryjson.projection ,function(error,docs){
		//console.log(error);
		console.log(docs,util.inspect(docs, { depth: 6}));
	});

/*
studentModel.find(queryjson2.condition, queryjson2.projection ,function(error,docs){
		//console.log(error);
		console.log(docs,util.inspect(docs, { depth: 6}));
	});
	*/








const eventSchema = new mongoose.Schema({
	/*LMS Field*/
})
const eventModel = mongoose.model('eventModel', eventSchema, 'events')

const teacherSchema = new mongoose.Schema({
})
const teacherModel = mongoose.model('teacherModel', teacherSchema, 'teachers')

const institutionSchema = new mongoose.Schema({
})
const institutionModel = mongoose.model('institutionModel', institutionSchema, 'institutions')

const courseSchema = new mongoose.Schema({
	/*LMS Field, z.B. BM RLP -> Lektionen- und Prüfungstafel*/
})
const courseModel = mongoose.model('courseModel', courseSchema, 'courses')

const courseClassSchema = new mongoose.Schema({
	/*LMS Field inkl. Prüfungsklassen*/
	courseClassIdentifier: String,
	studentMembers: [{studentIdentifier: String}]
})
const courseClassModel = mongoose.model('courseClassModel', courseSchema, 'courseclasses')

const analyticsSchema = new mongoose.Schema({
})
const analyticsModel = mongoose.model('analyticsModel', analyticsSchema, 'analytics')

const infrastructureSchema = new mongoose.Schema({
})
const infrastructureModel = mongoose.model('infrastructureModel', infrastructureSchema, 'infrastructure')
















