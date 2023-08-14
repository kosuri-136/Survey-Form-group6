import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../App';
import './Preview.css'; // Use the same CSS file as PrevQues

function QuestionList({ themeData, selectedOptions }) {
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [token] = useContext(Store);
  const navigate = useNavigate();
  const REACT_APP_API_ENDPOINT = 'http://localhost:3003'; // Replace with your API endpoint

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchData();
    }
  }, [token, navigate]);

  function fetchData() {
    fetch(`${REACT_APP_API_ENDPOINT}/ques`, {
      headers: {
        'x-token': token,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'Success') {
          setQuestions(data.result);
        }
      })
      .catch(error => console.error('Failed to fetch questions:', error));
  }

  // const handleOptionClick = (optionIndex) => {
  //   if (selectedOption === optionIndex) {
  //     setSelectedOption(null);
  //   } else {
  //     setSelectedOption(optionIndex);
  //   }
  // };


  const rootClassName = themeData.themeOpt === 'darkTheme' ? 'dark-theme' : '';
  const font = themeData.font || 'default-font'; // Use default font if themeData.font is empty



  return (
    <div id='qcontainermain' className={`prev-ques ${rootClassName}`}  style={{ color: 'themeData.color', fontFamily: 'themeData.color' }}>
     
      {questions.map((question, index) => (
        <div className='qcontainer' key={index}
        
        style={{
          backgroundColor: themeData.color, // Apply the background color
          fontFamily: themeData.font, // Apply the font
          color:  "black", // You might want to adjust this based on your theme settings
        }}
        
        
        >
          
          <span className='question'><b><h3   style={{  "color":"black" }}>Question {index + 1}</h3></b> </span>
          <h5 >{question.questionText}</h5>
          {question.option.map((opt, optionIndex) => (
            <React.Fragment key={optionIndex}>
              <div
                // onClick={() => handleOptionClick(optionIndex)}
                // className={`circle ${selectedOption === optionIndex ? 'selected' : ''}`}
                // style={{  "color":"black" }}
                 className={`circle ${
                  selectedOptions[index] === optionIndex ? 'selected' : ''
                }`}
                style={{ cursor: 'not-allowed' }}
               
              ></div>
              <span className="my-option">{opt}</span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

export default QuestionList;

