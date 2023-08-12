import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faTableList,
    faHouse,
} from "@fortawesome/free-solid-svg-icons";
import Navcommon from '../Navbar/Navbar';
import Surveylist from '../Surveylist/Surveylist';

function Sidebar() {
    const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/')
  }
    return (

        <>
        <div className="sidebar">
            <ul>
                <li className='home' onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faHouse} />
                </li>
                <li >
                <FontAwesomeIcon icon={faUsers} />
                    
                </li>
                <li>
                    <FontAwesomeIcon icon={faTableList} />
                </li>
            </ul>
        </div>
   
    </>

    )
}

export default Sidebar
