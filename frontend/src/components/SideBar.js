import React from 'react'
import { GiInjustice } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { FaUniversity } from 'react-icons/fa'
import { GiPapers } from 'react-icons/gi'
import { MdDashboardCustomize } from 'react-icons/md'
import { MdAppRegistration } from 'react-icons/md'
import { ImHammer2 } from 'react-icons/im'

const SideBar = () => {

  
    return (
        <div>
            <div className="side-bar">
              
                    <div className='list-item'>
                        <div className="icon">
                            <MdDashboardCustomize />
                        </div>
                        <div className="text">
                            <p>Dashboard</p>
                        </div>
                    </div>
              
                    <div className='list-item'>
                        <div className="icon">
                            <FaUniversity />
                        </div>
                        <div className="text">
                            <p>Institution Branch</p>
                        </div>
                    </div>
     

                    <div className='list-item'>
                        <div className="icon">
                            <GiInjustice />
                        </div>
                        <div className="text">
                            <p>Judiciary Branch</p>
                        </div>
                    </div>

                    <div className='list-item'>
                        <div className="icon">
                            <GiPapers />
                        </div>
                        <div className="text">
                            <p>Proposed List</p>
                        </div>
                    </div>

             
                    <div className='list-item'>
                        <div className="icon">
                            <MdAppRegistration />
                        </div>
                        <div className="text">
                            <p>Registrar</p>
                        </div>
                    </div>

        

                    <div className='list-item'>
                        <div className="icon">
                            <ImHammer2 />
                        </div>
                        <div className="text">
                            <p>Hearings</p>
                        </div>
                    </div>

            </div>
        </div>
    )
}

export default SideBar