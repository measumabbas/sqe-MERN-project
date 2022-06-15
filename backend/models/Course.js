const mongoose = require('mongoose');

const CoursSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    }
})


module.exports = mongoose.model('Cours',CoursSchema);