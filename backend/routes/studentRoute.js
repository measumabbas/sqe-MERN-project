const router = require('express').Router();
const Student = require('../models/Student');
const Course = require('../models/Courses');
const Cours = require('../models/Course');
const Courses = require('../models/Courses');
const { createIndexes, findByIdAndUpdate, findByIdAndDelete } = require('../models/Student');


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
        res.status(500).json(error)
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


router.post('/getsecscourses',async (req,res)=>{
    const registration = req.body.registration
    try {
        const course = await Courses.find();
        // console.log(course);
        let filtered = course.filter((c)=>{
            return c.registration === registration
        })
        if(filtered.length !== 0){
            res.status(200).json(filtered);
        }else{
            res.status(404).json('Not Found');
        }

    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/delete', async (req,res)=>{
    const name = req.body.name;
    const registration = req.body.registration

    try {

        // console.log(name,registration);
        const course = await Courses.find()
        let filtered = course.filter((c)=>{
            return c.registration === registration;
        })
        // console.log(name)
        let delId = filtered[0].id
        const toDelete = await Courses.findById(delId);
        const result = await Courses.findByIdAndUpdate(delId,{
            $pull:{courses:{$in:name}}
        },{new:true})
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/deleteall', async (req,res)=>{
    const registration = req.body.registration;

    try {
        const course = await Courses.find()
        let filtered = course.filter((c)=>{
            return c.registration === registration;
        });
        let delId = filtered[0].id;
        let toDeleteCourse = await Courses.findByIdAndRemove(delId);
        res.status(200).json(toDeleteCourse)
    } catch (error) {
        res.status(500).json(error);
    }
   

})

module.exports = router;