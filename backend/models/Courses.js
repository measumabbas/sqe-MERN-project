const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({

    registration: {
        type: String,
        required: true,
        unique:true
    },
    courses: {
        type: Array
    }
})


module.exports = mongoose.model('Course',CourseSchema);