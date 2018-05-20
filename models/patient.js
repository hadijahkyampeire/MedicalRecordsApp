var mongoose = require('mongoose');

// patient Schema/ db table
var patientSchema = mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String
    },
    contacts:{
        type: String,
        required: true
    },
    medical_history:{
        type: String
    },
    current_medication:{
        type: String
    },
    allergies:{
        type: String
    },
    nextOfKin:{
        type: String,
        required: true
    },
    telephone:{
        type: String,
        required: true
    },
    illness:{
        type: String,
        required: true
    },
    medication:{
        type: String,
        required: true
    },
})
// Export so that it is accessible from anywhere
var Patient = module.exports = mongoose.model('Patient', patientSchema)

// Get patients
module.exports.getPatients = function(callback, limit){
    Patient.find(callback).limit(limit);
}

// Get one patient
module.exports.getPatientById = function(id, callback){
    Patient.findById(id, callback);
}

// Add patient
module.exports.addPatient = function(patient, callback){
    Patient.create(patient, callback);
}

// Update patient
module.exports.updatePatient = function(id, patient, options, callback){
    var query = {_id: id};
    var update = {
        firstname: patient.firstname,
        lastname: patient.lastname,
        email: patient.email,
        contacts: patient.contacts,
        medical_history: patient.medical_history,
        current_medication: patient.current_medication,
        allergies: patient.allergies,
        nextOfKin: patient.nextOfKin,
        telephone: patient.telephone,
        illness: patient.illness,
        medication: patient.medication
    }
    Patient.findOneAndUpdate(query, update, options, callback);
}

// Delete patient
module.exports.removePatient = function(id, callback){
    var query = {_id:id}
    Patient.remove(query, callback);
}