var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
Patient = require('./models/patient')
Medicine = require('./models/medicine')

// connect to mongoose
mongoose.connect('mongodb://localhost/medicalrecords')

// db object
var db = mongoose.connection

app.get('/', function(req, res){
    res.send('Please use1 api/patient or api/medicines');
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

// Get a patient by id
app.get('/api/patients/:_id', function(req, res){
    Patient.getPatientById(req.params._id, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
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
        res.json({
            patient:patient,
            status:201,
            success:true,
            message:'patient added successfully'});
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
        res.json({
            patient:patient,
            status:201,
            success:true,
            message:'patient updated successfully'});
    });
});

// Delete patient
app.delete('/api/patients/:_id', function(req, res){
    // req.body allows us to access everything coming from the forms into the patient object
    var id = req.params._id;
    var patient = Patient.getPatientById(req.params.id);
    Patient.removePatient(id, function(err, patient){
        if(patient == null || patient == 'undefined'){
            res.status(404)
            throw err;
        }
        res.json({
            success:true,
            message:'patient deleted successfully'});
    });
});

// Get all medicines
app.get('/api/medicines', function(req, res){
    Medicine.getMedicines(function(err, medicines){
        if (err){
            throw err;
        }
        res.json(medicines)
    });
})

//  Get one medicine by id
app.get('/api/medicines/:_id', function(req, res){
    Medicine.getMedicineById(function(err, medicine){
        if (err){
            throw err;
        }
        res.json(medicine)
    });
})

// Add medicine
app.post('/api/medicines', function(req, res){
    var medicine = req.body;
    Medicine.addMedicine(medicine, function(err, medicine){
        if (err){
            throw err;
        }
        res.json({
            medicine:medicine,
            success:true,
            message:'medicine added successfully'
        })
    });
})

// Edit medicine
app.put('/api/medicines/:_id', function(req, res){
    var id = req.params._id;
    var medicine = req.body;
    Medicine.updateMedicine(id, medicine, {}, function(err, medicine){
        if(err){
            throw err; 
        }
        res.json({
            medicine:medicine,
            success:true,
            message:'medicine updated successfully'
        });
    });
})

// delete medicine
app.delete('/api/medicines/:_id', function(req, res){
    var id = req.params._id;
    var medicine = req.body;
    Medicine.removeMedicine(id, function(err, medicine){
        if(err){
            throw err;
        }
        res.json({
            success:true,
            message:'medicine deleted successfully'
        });
    });
})

app.listen('3000');
console.log('Running at 3000....');