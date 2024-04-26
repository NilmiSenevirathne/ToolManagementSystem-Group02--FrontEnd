import React, { useEffect, useState } from 'react';
import './LoginForm.css';
import Login from '../../src/images/user1.jpg';
import Validation from '../../src/LoginPage/Validation.js';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate(); // Using useNavigate hook instead of Navigate component

    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    
    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
      e.preventDefault();

      const validationErrors = Validation(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
          fetch('http://localhost:8080/authentication/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
          })
              .then(response => {
                  if (response.ok) {
                      console.log("Login Success!!");
                     if((values.username === 'isuru@gmail.com') && (values.password === 'isuru@123') )
                     {
                        navigate("Admin");
                     }
                     else if((values.username === 'gagana@gmail.com') && (values.password === 'Gagana@623'))
                     {
                        navigate("Manager");
                     }
                     else if((values.username === 'nimantha@gmail.com') && (values.password === 'Nima#456'))
                     {
                        navigate("/stocksupervisordashboard");
                     }
                     else if((values.username === 'kusal@gmail.com') && (values.password === 'kusal#@8'))
                     {
                        navigate("/supervisordashboard");
                     }
                       
                  } else {
                      throw new Error('Login failed'); // Throw error for unsuccessful response
                  }
              })
              .then(data => {
                  // Handle successful login response
                  console.log(data); // This will be the data returned from backend
                  // Redirect to dashboard or do something else
              })
              .catch(error => {
                  console.error('Error during login:', error);
                  // Handle login error, maybe show a message to the user
              });
      } else {
          console.error('Form validation errors:', validationErrors);
          // Handle form validation errors, maybe display them to the user
      }
  }
     
     
  return (
    <div >
        <div className='wrapper'>

           
           <form onSubmit={handleSubmit}>
             
                <h1 className='name'> Dilum BMK Engineers (Pvt)Ltd. </h1>
                <img className="englogo" src={Login} alt=''/> 
                <h1>Login</h1>

                <div className='input-box'> 
                   <label htmlFor='email'>Username</label>
                   <input type='email' placeholder='Email' value={values.name} name='name' onChange={handleChange} />
                  {errors.name && <p style= {{color: "red" , fontSize: "13px"}}> {errors.name}</p>}
                   <FaUser className='icon' />
                </div>

                <div className='input-box'> 
                   <label htmlFor='password'>Password</label>
                   <input type='password' placeholder='password' value= {values.password} name='password' onChange={handleChange}/>
                   {errors.password && <p style= {{color: "red" , fontSize: "13px"}}> {errors.password}</p>}
                   <FaLock className='icon'/>
                </div>
                
                    <button className='submit'>Login</button>
                
                
            
           </form>
        </div>
    </div>
  )

  }
export default LoginForm
