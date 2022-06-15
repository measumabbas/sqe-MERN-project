import React, { useState,useEffect, useRef } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Profile from '../components/Profile/Profile'
import axios from 'axios'

const Home = ({user}) => {

    const[userModal, setUserModal] = useState(false);
    const [course,setCourse] = useState('')

    const [courses,setCourses] = useState([]);
    const [total,setTotal] = useState([])
    
    // const [value, setValue] = useState('');

    const selectRef = useRef()


      // const handleChange = (e) => {
      //   setValue(e.target.value);
      // };
    useEffect(()=>{
      
      const getAllCourses = async ()=>{
        const response = await axios.get('http://localhost:5000/api/register/getcourses');
        setCourses(response.data)
      }

      getAllCourses()
    },[]);

      var arr =[];
    const addToCourses = (course)=>{
      arr = [course,...total];
      console.log(arr)
      console.log(course);
      setTotal(arr)
      console.log(total);
    }
    const handleSubmit = (e)=>{
      e.preventDefault();
      // console.log(selectRef.current.value)
      addToCourses(selectRef.current.value);
      // console.log(total);

      console.log(arr);
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

                <button type='reset'>Reject</button>
                <button>Accept</button>
                </div>

        </form>
      </div>
      </div>
    </div>

    </div>
  )
}

export default Home