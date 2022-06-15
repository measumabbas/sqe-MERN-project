import React from 'react'
import { Link } from 'react-router-dom'
import './signup.css';
import logo from './gb.png'
const SignUp = () => {
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
                        <form action="">
                            <input type="text" placeholder="Name"/>
                            <input type="email" placeholder="Email"/>
                            <br/>
                            <input type="text" placeholder="Phone Number"/>
                            <input type="text" placeholder='Registration number'/>
                            <br/>
                            <input type="password" placeholder="Password"/>
                            <input type="password" placeholder="Retype Password"/>
                            <br/>

                            <textarea placeholder='Enter Your Address'></textarea>
                            <div className="sign-sec">
                                <Link to='/dash'>

                                <input type="button" value="SIGNUP"/>
                                </Link>
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