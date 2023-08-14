

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTableList, faHouse } from '@fortawesome/free-solid-svg-icons';
import Navcommon from '../Navbar/Navbar';
import Surveylist from '../Surveylist/Surveylist';

function Sidebar() {
  const navigate = useNavigate();
  const [activeIcon, setActiveIcon] = useState(null); // State to track active icon

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName); // Set active icon state

    if (iconName === 'home') {
      navigate('/');
    } else if (iconName === 'preview') {
      navigate('/preview');
    } else if (iconName === 'list') {
      navigate('/surveylist');
    }
  };

  return (
    <>
      <div className="sidebar">
        <ul>
          <li className={activeIcon === 'home' ? 'active' : ''} onClick={() => handleIconClick('home')}>
            <div>
              <FontAwesomeIcon icon={faHouse} />
            </div>
          </li>
          <li className={activeIcon === 'preview' ? 'active' : ''} onClick={() => handleIconClick('preview')}>
            <div>
              <FontAwesomeIcon icon={faUsers} />
            </div>
          </li>
          <li className={activeIcon === 'list' ? 'active' : ''} onClick={() => handleIconClick('list')}>
            <div>
              <FontAwesomeIcon icon={faTableList} />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
