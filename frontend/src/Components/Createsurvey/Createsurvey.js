import React, { useEffect, useState, useContext} from 'react';
import './Createsurvey.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../SideBar/SideBar';
import Navcommon from '../Navbar/Navbar';
import { Store } from '../../App';
import Image1 from "../image.png"; // 
import { message } from "antd";


const REACT_APP_API_ENDPOINT='http://localhost:3003'


const CreateSurvey = () => {

  const navigate = useNavigate();
  const [token] = useContext(Store); // Get the token from context
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('N/A');
  const [surveyType, setSurveyType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [criteria, setCriteria] = useState('N/A');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const email = localStorage.getItem('email')
  // console.log(email);



  useEffect(() => {
    // Check for authentication before rendering the page
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);



  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(file);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  

  
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('surveyType', surveyType);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('criteria', criteria);
    formData.append('image', image);
    // console.log(formData);
    
    fetch(`${REACT_APP_API_ENDPOINT}/survey`, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Survey creation failed');
        }
      })
      .then(data => {
        // console.log(data.result._id);
        localStorage.setItem('id', data.result._id);
        message.success("Survey Created Successfully");
        navigate('/createquestion'); // Navigate here after data is saved
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  
  const handleCancle = (e) =>{
    navigate('/surveylist')
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (<>
    <Navcommon/>
        <div className="frame">
        
        <Sidebar/>
    <div id="survey">
      
    <form onSubmit={handleSubmit}>
    <div className="heading-container">
      <h2>Create Survey</h2>
      <div className="button-container">
        <button type="button" className="cancel-button" onClick={handleCancle}>
          Cancel
        </button>
        
        <button type="submit" className="next-button">
          Next
        </button>
      </div>
    </div>
    <hr />
        <div className="form-container">
          <div className="left-side">
          <div className="form-field">
  <label htmlFor="name">Name:</label>
  <input
    type="text"
    id="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Survey Name"
    required
  />
</div>


            <div className="form-field">
              <label htmlFor="description">Description:</label>
              <input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              ></input>
            </div>

            <div className="form-field">
              <label htmlFor="surveyType">Survey Type:</label>
              <select
                id="surveyType"
                value={surveyType}
                onChange={(e) => setSurveyType(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="video">Video</option>
                <option value="image">Image</option>
                <option value="feedback">Feedback</option>
                <option value="product">Product</option>
              </select>
            </div>
          </div>

          <div className="right-side">
            <div className="form-field">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="criteria">Other Criteria:</label>
              <input
                id="criteria"
                value={criteria}
                onChange={(e) => setCriteria(e.target.value)}
                placeholder="Enter Here"
                required
              ></input>
            </div>

            <div className="form-field">
              {/* <label  htmlFor="image">Upload Image:</label>
              <input className='image'
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
              />
               {image && (
    <img
      src={URL.createObjectURL(image)}
      alt="Chosen Image"
      className="chosen-image"
    />
  )} */}
<label htmlFor="image" className="upload-label" onDrop={handleImageDrop} onDragOver={handleDragOver}>Upload Image
  {image && (
    <img
      src={URL.createObjectURL(image)}
      alt="Dragged Image"
      className="dragged-image"
    />
  )}
  <div className="upload-icon">
    <img src={Image1} alt="Upload Icon" className="icon" />
    {/* <p>Drag & Drop</p> */}
  </div>
</label>
<div className="input-container">
  <input
    type="file"
    id="image"
    onChange={handleImageChange}
    accept="image/*"
    style={{ display: 'none' }}
  />
</div>


            </div>
          </div>
        </div>
        
      </form>
    </div>
    </div>
     
  </>
    
  );
};

export default CreateSurvey;


