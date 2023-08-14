import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faCheck } from '@fortawesome/free-solid-svg-icons';
import './Createquestion.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../SideBar/SideBar';
import Theme from '../Theme/Theme';
import Navcommon from '../Navbar/Navbar';
import { Store } from '../../App';
import { message } from "antd";
import { faCog } from '@fortawesome/free-solid-svg-icons';


const REACT_APP_API_ENDPOINT = 'http://localhost:3003';

const CreateQuestion = () => {
  const email = localStorage.getItem('email');
  const surveyId = localStorage.getItem('id');
  const navigate = useNavigate();
  const [token] = useContext(Store);



  const preview = (e) => {
    e.preventDefault();
    (async () => {
      await handleSave();// Save the questions before navigating
    
      navigate('/preview', { state: { selectedOptions } });
  })();
  };

  const [questionsData, setQuestionsData] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [option, setOption] = useState(['Option 1', 'Option 2', 'Option 3']);
  const [selectedOptions, setSelectedOptions] = useState([]);






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
  






  const handleAddQuestion = () => {
    setQuestionsData((prevData) => [
      ...prevData,
      { questionText, options: [...option] },
    ]);
    setQuestionText('');
    setOption(['Option1', 'Option2', 'Option3']);

    localStorage.setItem('questionsData', JSON.stringify(questionsData));
  };

  const handleAddOption = () => {
    let newOption = `Option${option.length + 1}`;
    setOption([...option, newOption]);
  };

  const handleRemoveOption = (index) => {
    const updatedOption = [...option];
    updatedOption.splice(index, 1);
    setOption(updatedOption);
  };



  const handleSave = async () => {
    const newQuestions = questionsData.map((question) => {
      return {
        surveyId,
        email,
        questionText: question.questionText,
        option: question.options,
      };
    });

    try {
      await Promise.all(
        newQuestions.map(async (newQues) => {
          const response = await fetch(`${REACT_APP_API_ENDPOINT}/ques`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-token': token, // Send the token in the request headers
            },
            body: JSON.stringify(newQues),
          });
          const result = await response.json();
          message.success("Questions Saved Successfully")
          console.log(result); // Check the response from the backend
        })
      );

      navigate('/preview');
    } catch (error) {
      console.error('Error:', error);
    }
  };











  return (
    <>
      <Navcommon />
      <div className="frame">
        <Sidebar />
        <div className="next-page-container">
          <div className="header-container">
            <div className="back-arrow">
              <FontAwesomeIcon icon={faArrowLeft} />
              <h2>Create Questions</h2>
            </div>

            <div className="buttons-container">
              <button className="preview-button" onClick={preview}>
                Preview
              </button>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <Theme />
            </div>
          
          </div>
          <hr />

          {/* Render existing questions */}
          {questionsData.map((question, index) => (
            <div key={index} className="question-container">
              
              <div className="question-wrapper">
                <span className="question-number">{`Q ${index + 1}`}</span>
                

                <span className="question-text">{`Question ${
                  index + 1
                }:`}</span>


                <div className="existing-ques">
                  <input
                    className="input-box"
                    value={question.questionText}
                    disabled
                  />
                </div>
              </div>

              {question.options.map((opt, optIndex) => (
                <div    className='el'  key={optIndex}>
                  <label  className="disableoption" >
                    <input
                      className="disabledtext"
                      type="radio"
                      name={`question${index}`}
                      value={opt}
                      checked={selectedOptions[index] === opt} 
                      onChange={() => handleOptionSelect(index, opt)}
                      readOnly
                      disabled
                    />
                  <span className={`opt${selectedOptions[index] === opt ? ' selected' : ''}`}>
                     {opt} {selectedOptions[index] === opt && <FontAwesomeIcon icon={faCheck} />}
                    
                    </span> 
                  </label>
                </div>
              ))}
            </div>
          ))}

          {/* Render new question input */}
          <div className="question-container">
            <div className="question-wrapper">
              <span className="question-number">{`Q ${
                questionsData.length + 1
              }`}</span>
              <span className="question-text">{`Question ${
                questionsData.length + 1
              }:`}</span>
              <div className='enterqt'>
                <input
                  className="input-box"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter your question here"
                  required
                />
              </div>
            </div>
            {/* Add option for new question */}
            {option.map((opt, index) => (
              <div key={index} className="option">
                <label>
                  <input
                    type="radio"
                    name={`Option${index}`}
                    value={opt}
                    checked={selectedOptions[questionsData.length] === opt}
                    onChange={() => handleOptionSelect(questionsData.length, opt)}
                    // defaultChecked={false}
                    readOnly
                  />
                  <span>{opt}</span>
               
                {index === 0 ? (
                  <button className="m-btn" onClick={handleAddOption}>
                    +
                  </button>
                ) : (
                  <button
                    className="m-btn"
                    style={{ "backgroundColor":"Red"}}
                    onClick={() => handleRemoveOption(index)}
                  >
                    -
                  </button>
                )}
                 </label>
              </div>
            ))}
          </div>

          {/* Add question button */}
          <div className="centered-container">
            <div>
              <center>
              <button className="addbutton" onClick={handleAddQuestion}>
                Add Question
              </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateQuestion;
