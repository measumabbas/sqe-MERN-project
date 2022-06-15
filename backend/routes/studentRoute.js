const router = require('express').Router();
const Student = require('../models/Student');
const Course = require('../models/Courses');
const Cours = require('../models/Course')


router.post('/add', async (req,res)=>{
    
    try {
        const newStudent =  new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(200).json({savedStudent});
    } catch (error) {
        res.status(500).json('Internal Server Error')
    }
});



router.post('/course',async (req,res)=>{
    try {
        const newCourse =  new Course(req.body);
        const savedCourse = await newCourse.save();
        res.status(200).json({savedCourse});
    } catch (error) {
        res.status(500).json('Internal Server Error')
    }
});


router.post('/auth',async(req,res)=>{
    try {
        // console.log('inside try');
        const student = await Student.findOne({email :req.body.email});

        // console.log(student);
        !student && res.status(400).json({
            message:'Wrong Credentials',
            success:false
        })
        if(student){
            // console.log('inside if');
            const validated = req.body.password === student.password;
            // console.log(validated)
            if(!validated){
                res.status(400).json({
                    message:'Wrong Credentials',
                    success:false
                });
            }
            else{
                res.status(200).json(student);
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/addcourse', async (req,res)=>{
    try {
        const newCourse = new Cours(req.body);
        const savedCours = await newCourse.save();

        res.status(200).json(savedCours)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/getcourses',async (req,res)=>{
    try {
        const courses = await Cours.find();
        res.status(200).json(courses);
    } catch (error) {

        res.status(500).json(error);
        
    }
})
module.exports = router;