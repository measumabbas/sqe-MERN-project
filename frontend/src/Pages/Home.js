import React, { useState,useEffect, useRef, useContext } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Profile from '../components/Profile/Profile'
import axios from 'axios'
import { Context } from '../Context/Context'
import { toast } from 'react-toastify'
import ReactDOM from 'react-dom';

const Home = () => {

    const {user} = useContext(Context);
    const[userModal, setUserModal] = useState(false);
    const [course,setCourse] = useState('')

    const [courses,setCourses] = useState([]);
    const [total,setTotal] = useState([]);
    const [specCourse,setSpecCourse] = useState([])
    
    // const [value, setValue] = useState('');

    const selectRef = useRef()
    const resetRef = useRef()


      // const handleChange = (e) => {
      //   setValue(e.target.value);
      // };
    useEffect(()=>{
      
      const getAllCourses = async ()=>{
        const response = await axios.get('http://localhost:5000/api/register/getcourses');
        setCourses(response.data);
        getAllCourse();
      }

      getAllCourses();
      
    },[]);

      var arr =[];
    const addToCourses = (course)=>{
      arr = [course,...total];
      // console.log(arr)
      // console.log(course);
      setTotal(arr)
      // console.log(total);
    }
    const handleSubmit = (e)=>{
      e.preventDefault();
      addToCourses(selectRef.current.value);
      // localStorage.setItem("courses",JSON.stringify(arr));
      let confirm = window.confirm('Do you want to select another course');
      // console.log(confirm);
      if(confirm){
        resetRef.current.click()
      }else{
        postCourses();
        getAllCourse();
      }
    }

    const getAllCourse = async ()=>{
      try {
        const course = await axios.post('http://localhost:5000/api/register/getsecscourses',{
          registration:user.registration
        });
        console.log(course.status);
        setSpecCourse(course.data[0].courses);

        console.log(specCourse);
      } catch (error) {
        console.log(error)
        setSpecCourse([]);
      }
    }

    const postCourses = async ()=>{
      try {
        const result = await axios.post('http://localhost:5000/api/register/course',{
          registration:user.registration,
          courses:arr
        })
        toast.success('Courses are added to database successfuly');
        // setInputDiv(false);
        // setCourseDiv(true)
      } catch (error) {
        toast.error('Sorry , You Can Enroll to Courses Only Once');
      }
    }

    const handleDelete = async (e)=>{
      console.log(e);
      let parent = ReactDOM.findDOMNode(e.target).parentNode.parentNode;
      console.log(parent);
      let courseToDelete = parent.children[0].textContent

      let confirm = window.confirm('Are You sure You Want to delete the course');

      if(confirm){

        try {
          
          const res = await axios.delete('http://localhost:5000/api/register/delete',{data:{
            name:courseToDelete,
            registration:user.registration
          }});
  
          if(res.status === 200){
            toast.success('Course Has Been Deleted Successfully');
            getAllCourse();
            console.log(specCourse);
          }else{
            toast.error('Some Error Occured');
          }
        } catch (error) {
          toast.error('Internal Server Error')
        }
      }
    }

    const handleDrop = async ()=>{

      let confirm = window.confirm('Do you want delete current courses and enroll again ?');

      if(confirm){

        try {
          const res = await axios.delete('http://localhost:5000/api/register/deleteall',{data:{
            registration:user.registration
          }})
  
          if(res.status===200){
            window.location.reload()
              toast.success('Courses Deleted Successfully');
          }else{
            toast.error('Some Error Occured');
          }
        } catch (error) {
          console.log(error)
          toast.error('Internal Server Error');
        }
      }else{

      }
    }
    
    return (
      <div>
        <div className="nav-side-container">
      <Header setUserModal={setUserModal} userModal={userModal}/>
      
      
      <div className="left-right-container">
      <SideBar/>
      <div className="graph-bar">
        {
          userModal && <Profile/>            
        }



                  <form onSubmit={handleSubmit}>


                      <label style={{display:'block',marginBottom:'15px',fontSize:'20px',fontWeight:'bold'}} htmlFor="course">Choose a course:</label>

                      <select name="course" id="course" style={{diplay:'block'}} ref={selectRef}>
                      <option></option>
                          {
                            
                            courses && courses.map((course,index)=>(
                              <option key={index}>{course.courseName}</option>
                            ))
                          }
                      </select>

                          <div className="buttons">

                          <button ref={resetRef} type='reset'>Reject</button>
                          <button>Accept</button>
                          </div>

                  </form>
        


        <div className="courses-container">
          <div className="heading">

                <h1>List Of Courses You are enrolled in</h1>
                <div className="delete-all" onClick={handleDrop}>Re Enroll To courses</div>
          </div>

                <div className="courses">
                  {
                    specCourse && specCourse.map((course,index)=>(

                    <div className="course" key={index} >
                      <h3>{course}</h3>
                      <div className="options">
                        <div className="delete" onClick={handleDelete}>delete</div>
                        <div className="update">update</div>
                      </div>
                    </div>
                    ))
                  }
                </div>
        </div>
      </div>
      </div>
    </div>

    </div>
  )
}

export default Home