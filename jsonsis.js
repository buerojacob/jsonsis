/* Other standard data field recommendations: sbbk.ch; eCh.ch; ceds.ed.gov; schema.org */
const mongoose = require('mongoose');

const studentLifeCycleSchema = {
	/*https://de.slideshare.net/RobJonkers/sap-student-lifecycle-management-overview-november-2017*/
	entryStatus: [{description: String, value: String, lastChange: {type: Date, 'default': Date.now}}],
	enrollmentStatus: [{description: String, value: String, lastChange: {type: Date, 'default': Date.now}}],
	gradeStatus: [{description: String, value: String, lastChange: {type: Date, 'default': Date.now}}],
	alumniStatus: [{description: String, value: String, lastChange: {type: Date, 'default': Date.now}}]
	}

const personDataSchema = {
	officialName: {
		type: String,
		required: true},
	firstName: String,
	dateOfBirth: Date,
	sex: String	
}

const adressDataSchema = {
	adressLine1: String,
	adressLine2: String,
	street: String,
	houseNumber: String,
	swissZipCode: Number,
	town: String,
	locality: String
}

const disabilityCompensationSchema = {
	description: String,
	medicalIndicator: String,
	facilitations: String
}

const memberOfSchema = {
	/* see http://mongoosejs.com/docs/populate.html*/
	entryCourseClasses: [{entryCourseClassesIdentifier: String}],
	entryExamClasses: [{entryExamClassesIdentifier: String}],
	gradeCourseClasses: [{gradeCourseClassesIdentifier: String}],
	gradeExamClasses: [{gradeExamClassesIdentifier: String}]
}

const gradeElementSchema = {
	subject: String, 
	gradeValueQualifier: {
		type: Number,
		'default': 0,
		min: 0,
		max: 6	}, 
	absentsExcused: Number, 
	absentsUnexcused: Number
}

const gradeSemesterSchema = {
	courseID: String,
	schoolYear: String, 
	schoolSemester: String,
	gradeElements: [gradeElementSchema],
	gadeValueQualifierAverage: Number,
	absentsExcusedTotal: Number, 
	absentsUnexcusedTotal: Number, 
	gradeLevel: {type: String,'default': 'promoviert'}
}

const studentSchema = new mongoose.Schema({ 
	studentIdentifier: String,
	graduationPlan: [{course: String}],
	studentLifeCycle: {studentLifeCycleSchema},
	personData: {personDataSchema},
	adressData: {adressDataSchema},
	disabilityCompensation: {disabilityCompensationSchema},
	relationships: [{function: String, institutionName: String, adressData: adressDataSchema}],
	memberOf: [{memberOfSchema}],
	absenceTracker: [{eventID: String, number: Number}],
	gradesSemester: [{gradeSemesterSchema}],
	onGoingComment: String
});

const studentModel = mongoose.model('studentModel', studentSchema, 'students')

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
})
const courseClassModel = mongoose.model('courseClassModel', courseSchema, 'courseclasses')

const analyticsSchema = new mongoose.Schema({
})
const analyticsModel = mongoose.model('analyticsModel', analyticsSchema, 'analytics')

const infrastructureSchema = new mongoose.Schema({
})
const infrastructureModel = mongoose.model('infrastructureModel', infrastructureSchema, 'infrastructure')
