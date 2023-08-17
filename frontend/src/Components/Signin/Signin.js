import React, { useState } from 'react'
import { useNavigate ,} from 'react-router-dom';
import { Link } from 'react-router-dom';
import{  useContext } from 'react';
import { Store } from '../../App';
import axios from 'axios';
import { message } from "antd";
import './Signin.css'
// const REACT_APP_API_ENDPOINT='http://localhost:3003';
const REACT_APP_API_ENDPOINT = 'https://ssss-nt7r.onrender.com';


function Signin({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [fail, setFail] = useState('');
    const navigate = useNavigate();
    const [token, setToken] = useContext(Store);
 
    const validateForm = () => {
        const errors = {};

        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Invalid email address';
        }

        if (!password) {
            errors.password = 'Password is required';
        }
        // console.log(errors);
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(validateForm());
        if (validateForm()) {
            const loginData = {
                email,
                password
            };
            
            const headers = {
              'x-token': token // Include the token here
            };
            try{
              const res = await axios.post(`${REACT_APP_API_ENDPOINT}/signin`, loginData , { headers })

              setToken(res.data.token);
              if (res.data.token) {
                message.success("Login successfull");
                navigate('/surveylist');
              }
            } catch (error) {
              console.log(error.response);
              message.error("Enter Valid Details");
            }
          }
        
    };
           
    
    return (
        <div className="abc">


            <div className='Container'>
          
                    <div className='leftpartsignin'>        
                        <span className='text1' > Welcome Page </span>
                        <span className='text2'> One line text <br />  Will be here</span>
                        <span className='text3'>Sign in to continue access pages</span>
                        <span className='text4'>   Don’t Have An Account?</span>      
                        <Link to="/signup"><button className='registerbtn'>Register  </button></Link>   
                    </div>



                    <div className='signin'>
                                    <form>
                                        <h1 className='head'>Sign In </h1>
                                        <p className='text'>Sign in to continue access pages</p> {
                                        fail && <p className='text'>{fail}</p>
                                        }
                                    <div className="form-group">
                                       
                                        <label className="label1" htmlFor="email">Email</label>
                                            <input type="email" id="email"  className="input-field1" value={email}
                                                onChange={(e) => setEmail(e.target.value)} required />{errors.email && <span>{errors.email}</span>}
                                    </div>


                                        <hr />





                                    <div className='form-group'>
                                      
                                        <label className="label2" htmlFor="pass">Password</label>
                                            <input type="password"  id="pass" className="input-field2" value={password}
                                                onChange={(e) => setPassword(e.target.value)} required />
                                            {errors.password && <span>{errors.password}</span>}
                                    </div>
                                    <hr />
                                    <div >
                                        <button className='signinbtn' onClick={handleSubmit}>Sign in</button>
                                    </div>
                                  
                                    </form>
                    </div>




             </div>
        </div>
       
    )
}

export default Signin
