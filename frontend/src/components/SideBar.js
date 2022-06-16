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

            </div>
        </div>
    )
}

export default SideBar