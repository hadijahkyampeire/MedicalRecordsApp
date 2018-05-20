var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
Patient = require('./models/patient')

// connect to mongoose
mongoose.connect('mongodb://localhost/medicalrecords')

// db object
var db = mongoose.connection

app.get('/', function(req, res){
    res.send('Please use1 api/patient');
});

// Get all the patients
app.get('/api/patients', function(req, res){
    Patient.getPatients(function(err, patients){
        if(err){
            throw err;
        }
        res.json(patients);
    });
});

// Add patient
app.post('/api/patients', function(req, res){
    // req.body allows us to access everything coming from the forms into the patient object
    var patient = req.body;
    Patient.addPatient(patient, function(err, patient){
        if(err){
            throw err;
        }
        res.json(patient);
    });
});

// Update patient
app.put('/api/patients/:_id', function(req, res){
    // req.body allows us to access everything coming from the forms into the patient object
    var id = req.params._id;
    var patient = req.body;
    Patient.updatePatient(id, patient, {}, function(err, patient){
        if(err){
            throw err; 
        }
        res.json(patient);
    });
});

// Delete patient
app.delete('/api/patients/:_id', function(req, res){
    // req.body allows us to access everything coming from the forms into the patient object
    var id = req.params._id;
    var patient = req.body;
    Patient.removePatient(id, function(err, patient){
        if(err){
            throw err;
        }
        res.json(patient);
    });
});

app.listen('3000');
console.log('Running at 3000....');