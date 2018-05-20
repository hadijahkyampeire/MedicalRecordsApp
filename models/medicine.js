var mongoose = require('mongoose');

// medicine schema/table
var medicineSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    uses:{
        type: String,
        required: true
    },
    dosage:{
        type: String,
        required: true
    },
    sideeffects:{
        type: String,
        required: true
    },
    precautions:{
        type: String,
        required: true
    },
    image:{
        type: String
    }
})

// export the schema object so that it is accessed anywhere
var Medicine = module.exports = mongoose.model('Medicine', medicineSchema)

// get all medicine
module.exports.getMedicines = function(callback, limit){
    Medicine.find(callback).limit(limit);
}

// get one medicine
module.exports.getMedicineByIdv= function(id, callback){
    Medicine.findById(id, callback);
}

// Add medicine
module.exports.addMedicine = function(medicine, callback){
    Medicine.create(medicine, callback);
}

// Edit medicine
module.exports.editMedicine = function(id, medicine, options, callback){
    var query = {_id: id}
    var update = {
        name:medicine.name,
        description:medicine.description,
        uses:medicine.uses,
        dosage:medicine.dosage,
        sideeffects:medicine.sideeffects,
        precautions:medicine.precautions
    }
    Medicine.findOneAndUpdate(query, update, options, callback);
}

// delete medicine
module.exports.removeMedicine = function(id, callback){
    var query = {_id:id}
    Medicine.remove(callback, query);
}