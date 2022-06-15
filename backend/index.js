const express = require('express');
const cors = require('cors')
const app =express();
const studentRoute = require('./routes/studentRoute');
const mongoose = require('mongoose');
app.use(express.json());
app.use(cors())

MONGO_URI = 'mongodb://localhost:27017/student_registration?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

mongoose.connect(MONGO_URI,()=>{
    console.log('Connected to database successfully');
})

app.listen('5000',()=>{
    console.log('Backend in running at port 5000')
});


app.use('/api/register',studentRoute)