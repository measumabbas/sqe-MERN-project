import React, { useRef } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './signup.css';
import logo from './gb.png'
import axios from 'axios'
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const regRef = useRef();
    const passRef = useRef();
    const addRef = useRef();


    const handleSubmit= async (e)=>{
        e.preventDefault();
        const data = {
            name:nameRef.current.value,
            email:emailRef.current.value,
            phone:phoneRef.current.value,
            password:passRef.current.value,
            address:addRef.current.value,
            registration:regRef.current.value
        }

        try {
            const res = await axios.post('http://localhost:5000/api/register/add',data);
            if(res.status === 200){
                toast.success('Student has Been Added Successfully');
                setTimeout(()=>{
                    navigate('/');
                },2000)
            }
            else{
                toast.error('Some error occurred please try again');

            }
        } catch (error) {
            console.log(error);
            toast.error('Student With these details has been enrolled before');
        }
    }
  return (
    <div className="sign-container">
        <div className="sign-main-section">
            <div className="sign-text-section">
                <div className="head-sec">
                    <div className="img">
                    <img src={logo} alt="" />

                    </div>
                    <h2>Karakorum International University</h2>
                </div>
            </div>
            <div className="sign-main-log">
                <div className="signup-section">
                    <div className="sign-section">
                        <img src={logo} alt=""/>
                        <h2>Student Registration Form</h2>
                    </div>
                    <div className="from-sec">
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Name" ref={nameRef}/>
                            <input type="email" placeholder="Email" ref={emailRef}/>
                            <br/>
                            <input type="text" placeholder="Phone Number" ref={phoneRef}/>
                            <input type="text" placeholder='Registration number' ref={regRef}/>
                            <br/> 
                            <input type="password" placeholder="Password" ref={passRef}/>
                            <input type="password" placeholder="Retype Password"/>
                            <br/>

                            <textarea placeholder='Enter Your Address' ref={addRef}></textarea>
                            <div className="sign-sec">
                                <input type="submit" value="SIGNUP"/>
                            </div>
                            <div className="sign-link">
                                <h3>If you have already account?<Link to='/'>Login</Link></h3>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp