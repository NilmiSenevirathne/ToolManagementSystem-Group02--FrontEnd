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
