import React from 'react';
import logo from '../images/download.png'

const Header = ({userModal,setUserModal}) => {
  return (
    <div>
         <div className="header">
            <div className="left">
                <img src={logo} alt=""/>
                <p>Learning Management System</p>
            </div>
            <div className="right">
                <div className="notify">
                    <i className="fas fa-bell"></i>
                </div>
                <div className="profile" onClick={()=> setUserModal(!userModal)}>
                    <i className="fas fa-user"></i>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header