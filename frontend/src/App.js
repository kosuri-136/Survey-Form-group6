import React, { useState,createContext  } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin.js';
import Surveylist from './Components/Surveylist/Surveylist';
import CreateSurvey from './Components/Createsurvey/Createsurvey';
import CreateQuestion from './Components/Createquestion/Createquestion';
import Preview from './Components/Preview/Preview';
import ProtectedRoute from './Components/ProtectedRoute';
export const Store = createContext();
function App() {
  const [token, setToken] = useState(null);

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

