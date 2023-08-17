import React, { useState,createContext ,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin.js';
import Surveylist from './Components/Surveylist/Surveylist';
import CreateSurvey from './Components/Createsurvey/Createsurvey';
import CreateQuestion from './Components/Createquestion/Createquestion';
import Preview from './Components/Preview/Preview';

export const Store = createContext();
function App() {

  const storedToken = localStorage.getItem('token'); // Get token from localStorage
  const [token, setToken] = useState(storedToken);

  // Update token in localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);


  return (
    <div>
    <Store.Provider value={[ token, setToken ]}>

    <Router>
      <Routes>
        <Route exact path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/surveylist" element={<Surveylist />} />
        <Route path="/createsurvey" element={<CreateSurvey />} />
        <Route path="/createquestion" element={<CreateQuestion />} />
        <Route path="/preview" element={<Preview />} />
       
      </Routes>
    </Router>
    </Store.Provider>
    </div>
  );
}


export default App;

