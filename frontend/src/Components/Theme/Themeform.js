import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from "antd";

const REACT_APP_API_ENDPOINT='http://localhost:3003'


function MyForm({ closePopup }) {
  const navigate = useNavigate();
  const email = localStorage.getItem('email')
  const surveyId = localStorage.getItem('id')
  
  // console.log(email , surveyId);

  const [themeData, setThemeData] = useState({
    themeOpt: '',
    themeName: '',
    themeType: '',
    fromType: '',
    allQuestionMandatory: '',
    enableSkip: '',
    optionType: '',
    font: '',
    color: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setThemeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTheme = {
      email,
      surveyId,
       themeOpt:themeData.themeOpt,
       themeName:themeData.themeName,
       themeType:themeData.themeType,
       fromType:themeData.fromType,
       allQuestionMandatory:themeData.allQuestionMandatory,
       enableSkip:themeData.enableSkip,
       optionType:themeData.optionType,
       font:themeData.font,
       color:themeData.color
    };
fetch(`${REACT_APP_API_ENDPOINT}/themes`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newTheme),
  
},navigate('/preview'))
  .then(response => {
    if (response.status === 201) {
      // console.log('created');
      message.success("Theme Created and applied Successfully");
      setThemeData(newTheme); // Update the theme data in Theme component
    }else if (response.status === 200) {
      // console.log('updated');
      throw new Error('Error in theme creation');
    } else  {
      throw new Error('error in creation');
    } 
    closePopup(false)
    setThemeData(newTheme); 
  })
  .catch(error => {
    console.log( error);
  });
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formPart">
        <label htmlFor="themeOpt">Theme</label>
      
        <select
          id="themeOpt"
          name="themeOpt"
          value={themeData.themeOpt}
          onChange={handleInputChange}
          required
        >
          <option value=""> Select </option>
          <option value="normalTheme">Normal</option>
          <option value="darkTheme">Dark Theme</option>
        </select>
      </div>
      <div className="formPart2">
        <div>
          <label htmlFor="themeName">Theme Name</label>
    
          <input
            type="text"
            id="themeName"
            name="themeName"
            value={themeData.themeName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="themeType">Theme Type</label>
        
          <select
            id="themeType"
            name="themeType"
            value={themeData.themeType}
            onChange={handleInputChange}
            required
          >
            <option value=""> Select </option>
            <option value="option1">Survey</option>
          </select>
        </div>
        <div>
          <label htmlFor="fromType">From Type</label>
        
          <select
            id="fromType"
            name="fromType"
            value={themeData.fromType}
            onChange={handleInputChange}
            required
          >
            <option value=""> Select </option>
            <option value="option1">One to One</option>
          </select>
        </div>
        <div>
          <label htmlFor="allQuestionMandatory">All Question mandatory</label>
         
          <select
            id="allQuestionMandatory"
            name="allQuestionMandatory"
            value={themeData.allQuestionMandatory}
            onChange={handleInputChange}
            required
          >
            <option value=""> Select </option>
            <option value="option1">No</option>
            <option value="option2">Yes</option>
          </select>
        </div>
        <div>
          <label htmlFor="enableSkip">Enable Skip</label>
        
          <select
            id="enableSkip"
            name="enableSkip"
            value={themeData.enableSkip}
            onChange={handleInputChange}
            required
          >
            <option value=""> Select </option>
            <option value="option1">Yes</option>
            <option value="option2">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="optionType">Option Type</label>
        
          <select
            id="optionType"
            name="optionType"
            value={themeData.optionType}
            onChange={handleInputChange}
            required
          >
            <option value=""> Select </option>
            <option value="box">Box</option>
            <option value="dropdown">Dropdown</option>
          </select>
        </div>
      </div>
      <div className="formPart3">
        <div>
          <label htmlFor="font">Font</label>
       
          <select
            id="font"
            name="font"
            value={themeData.font}
            onChange={handleInputChange}
            required
          >
            <option value=""> Select </option>
            <option value="roboto">Roboto</option>
            <option value="fantasy">Fantasy</option>
            <option value="ariel">Ariel</option>
          </select>
        </div>
        <div>
          <label htmlFor="color">Color</label>
       
          <select
            id="color"
            name="color"
            value={themeData.color}
            onChange={handleInputChange}
            required
          >
            <option value=""> Select </option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="lightblue">Skyblue</option>
           
          </select>
        </div>
      </div>
      <div className="my-btn">
        <button className="cancelBtn" onClick={closePopup}>
          cancel
        </button>
        <button type="submit" className="saveBtn">
          save
        </button>
      </div>
    </form>
  );
}

export default MyForm;