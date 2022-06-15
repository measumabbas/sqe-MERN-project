const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    registration:{
        type:String,
        required:true,
        unique:true
    }
})


module.exports = mongoose.model('Student',StudentSchema);