import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './profile.css'
import {CgProfile} from 'react-icons/cg'
import {FiSettings} from 'react-icons/fi'
import {TiMessages} from 'react-icons/ti'
import {FiLogOut} from 'react-icons/fi'
import { Context } from '../../Context/Context'

const Profile = ({userModal,setUserModal}) => {

    const {user} = useContext(Context);
    const navigate = useNavigate()
    const handleLogOut = ()=>{

        localStorage.removeItem("user");
        navigate('/');
    }
  return (
    <div>
        <div className="profile2">
                <div className="items">
                    <CgProfile/>
                    <p>{user.name}</p>
                </div>
                <div className="items">
                   <FiSettings/>
                    <p>Settings</p>
                </div>
                <div className="items">
                   <TiMessages/>
                    <p>Messages</p>
                </div>
               

                <Link to='/'>
                    <div className="items log" onClick={handleLogOut}>
                       <FiLogOut/>
                        <p>Logout</p>
                    </div>
                </Link>
            </div>
    </div>
  )
}

export default Profile