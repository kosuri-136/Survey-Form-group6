import React, { useEffect, useState , useContext} from "react";
import { useNavigate } from 'react-router-dom';
import "./Preview.css";
// import PrevQues from "./PrevQues";
import Sidebar from "../SideBar/SideBar";
import Navcommon from "../Navbar/Navbar";
import { Store } from '../../App';
import QuestionList from "./questionlist";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const REACT_APP_API_ENDPOINT='http://localhost:3003'

function Preview() {
  const navigate = useNavigate()
  const [token] = useContext(Store); 

  const [selectedOptions, setSelectedOptions] = useState([]);

  const location = useLocation();
  const passedState = location.state || {};
  const passedSelectedOptions = passedState.selectedOptions || [];

  

  const surveyId = localStorage.getItem('id')
  const email = localStorage.getItem('email')

  const [themeData, setThemeData] = useState({});
  const [arr , setArr] = useState([])









  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/theme`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify({ email, surveyId }),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 202) {
          return response.json();
        } else {
          throw new Error('Recieved Error');
        }
      })
      .then(data => {
        const token = data;
        console.log(data);
        setThemeData(data);
      })
      .catch(error => {
        console.log('Login failed:', error);
      });
  }, [REACT_APP_API_ENDPOINT]);
  
  useEffect(() => {
    fetchData(`${REACT_APP_API_ENDPOINT}/ques/${surveyId}`)
      .then(data => {
        setArr(data.result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [REACT_APP_API_ENDPOINT, surveyId]);
  
  

  useEffect(() => {
    // Check for authentication before rendering the page
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setSelectedOptions((prevSelected) => {
      const newSelectedOptions = [...prevSelected];
      newSelectedOptions[questionIndex] = selectedOption;
      return newSelectedOptions;
    });
  };
  
  

  function fetchData(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.removeItem('id');
    navigate('/surveylist')
  };
  const handleClose = (e) => {
    e.preventDefault();
    navigate('/createquestion')
  }
  return (
    <>
    <Navcommon/>
    
    <div className="frame">
    <Sidebar/>
   
   
    <div className="container">
      <div className="top-part">
        <span className="left-part">  <FontAwesomeIcon icon={faArrowLeft} /> Preview </span>
        <span className="right-part">
            <button type="submit" className="save close" onClick={handleClose}>
            close preview
          </button>
          <button type="submit" className="save" onClick={handleSubmit}>
            save
          </button>
          <span className="myBtn"></span>
        </span>
      </div>
      

      
      <QuestionList themeData={themeData} selectedOptions={passedSelectedOptions} handleOptionSelect={handleOptionSelect} />

      
      </div>
    </div>
    
    </>
  );
}
export default Preview;

