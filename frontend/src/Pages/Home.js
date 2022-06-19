import React, { useState, useEffect, useRef, useContext } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Profile from '../components/Profile/Profile'
import axios from 'axios'
import { Context } from '../Context/Context'
import { toast } from 'react-toastify'
import ReactDOM from 'react-dom';
import { Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useContext(Context);
  const [userModal, setUserModal] = useState(false);
  const [course, setCourse] = useState('')

  const [courses, setCourses] = useState([]);
  const [total, setTotal] = useState([]);
  const [specCourse, setSpecCourse] = useState([]);

  const [courseToUpdate,setCourseToUpdate] = useState('')

  // const [value, setValue] = useState('');

  const selectRef = useRef();
  const resetRef = useRef();
  const btnRef = useRef();
  const updateRef = useRef();


  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };
  useEffect(() => {

    const getAllCourses = async () => {
      const response = await axios.get('http://localhost:5000/api/register/getcourses');
      setCourses(response.data);
      getAllCourse();
    }

    getAllCourses();

  }, []);

  var arr = [];
  const addToCourses = (course) => {
    arr = [course, ...total];
    // console.log(arr)
    // console.log(course);
    setTotal(arr)
    // console.log(total);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    addToCourses(selectRef.current.value);
    // localStorage.setItem("courses",JSON.stringify(arr));
    let confirm = window.confirm('Do you want to select another course');
    // console.log(confirm);
    if (confirm) {
      resetRef.current.click()
    } else {
      postCourses();
      getAllCourse();
    }
  }

  const getAllCourse = async () => {
    try {
      const course = await axios.post('http://localhost:5000/api/register/getsecscourses', {
        registration: user.registration
      });
      console.log(course.status);
      setSpecCourse(course.data[0].courses);

      console.log(specCourse);
    } catch (error) {
      console.log(error)
      setSpecCourse([]);
    }
  }

  const postCourses = async () => {
    try {
      const result = await axios.post('http://localhost:5000/api/register/course', {
        registration: user.registration,
        courses: arr
      })
      toast.success('Courses are added to database successfuly');
      // setInputDiv(false);
      // setCourseDiv(true)
    } catch (error) {
      toast.error('Sorry , You Can Enroll to Courses Only Once');
    }
  }

  const handleDelete = async (e) => {
    console.log(e);
    let parent = ReactDOM.findDOMNode(e.target).parentNode.parentNode;
    console.log(parent);
    let courseToDelete = parent.children[0].textContent

    let confirm = window.confirm('Are You sure You Want to delete the course');

    if (confirm) {

      try {

        const res = await axios.delete('http://localhost:5000/api/register/delete', {
          data: {
            name: courseToDelete,
            registration: user.registration
          }
        });

        if (res.status === 200) {
          toast.success('Course Has Been Deleted Successfully');
          getAllCourse();
          console.log(specCourse);
        } else {
          toast.error('Some Error Occured');
        }
      } catch (error) {
        toast.error('Internal Server Error')
      }
    }
  }

  const handleDrop = async () => {

    let confirm = window.confirm('Do you want delete current courses and enroll again ?');

    if (confirm) {

      try {
        const res = await axios.delete('http://localhost:5000/api/register/deleteall', {
          data: {
            registration: user.registration
          }
        })

        if (res.status === 200) {
          window.location.reload()
          toast.success('Courses Deleted Successfully');
        } else {
          toast.error('Some Error Occured');
        }
      } catch (error) {
        console.log(error)
        toast.error('Internal Server Error');
      }
    } else {

    }
  }

  const handleUpdate = (e) => {
    btnRef.current.click();
    let parent = ReactDOM.findDOMNode(e.target).parentNode.parentNode;
    let courseToUpdate = parent.children[0].textContent;
    setCourseToUpdate(courseToUpdate);
    // console.log(courseToUpdate);
  }

  const handleUpdateForm = async(e)=>{
    e.preventDefault();
    console.log(updateRef.current.value);
    console.log(courseToUpdate);

    try {
      
      const result = await axios.put('http://localhost:5000/api/register/update',{
        name:courseToUpdate,
        registration:user.registration,
        update:updateRef.current.value
      });
      const anotherResult = await axios.put('http://localhost:5000/api/register/update',{
        name:courseToUpdate,
        registration:user.registration,
        update:updateRef.current.value
      });
      console.log(anotherResult);
      if(anotherResult.status === 200){
        toast.success('Course Updated Successfully');
        getAllCourse();
      }else{
        toast.error('Some Error Occured')
      }
    } catch (error) {
      toast.error('Interval server error');
    }
  }

  return (
    <div>
      <div className="nav-side-container">
        <Header setUserModal={setUserModal} userModal={userModal} />


        <div className="left-right-container">
          <SideBar />
          <div className="graph-bar">
            {
              userModal && <Profile />
            }



            <form onSubmit={handleSubmit}>


              <label style={{ display: 'block', marginBottom: '15px', fontSize: '20px', fontWeight: 'bold' }} htmlFor="course">Choose a course:</label>

              <select name="course" id="course" style={{ diplay: 'block' }} ref={selectRef}>
                <option></option>
                {

                  courses && courses.map((course, index) => (
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
                  specCourse && specCourse.map((course, index) => (

                    <div className="course" key={index} >
                      <h3>{course}</h3>
                      <div className="options">
                        <div className="delete" onClick={handleDelete}>delete</div>
                        <div className="update" onClick={handleUpdate}>update</div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button variant="primary" onClick={handleShow} ref={btnRef}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateForm}>
            <label style={{ display: 'block', marginBottom: '15px', fontSize: '20px', fontWeight: 'bold' }} htmlFor="course">Choose a course you want to update with:</label>

            <select name="course" id="course" style={{ diplay: 'block' }} ref={updateRef}>
              <option></option>
              {

                courses && courses.map((course, index) => (
                  <option key={index}>{course.courseName}</option>
                ))
              }
            </select>
            <Button type='submit' style={{display:'block',marginTop:'20px'}} variant="secondary" onClick={handleClose}>
              Update
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Home