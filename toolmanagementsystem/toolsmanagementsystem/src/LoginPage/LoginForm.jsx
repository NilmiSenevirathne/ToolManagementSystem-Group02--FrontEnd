import React, { useState } from 'react';
import './LoginForm.css';
import Login from '../../src/images/user1.jpg';
import Validation from '../../src/LoginPage/Validation.js';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate(); 

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
                    return response.text();
                } else {
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage);
                    });
                }
            })
            .then(role => {
                console.log("Login Success!!");
                switch (role.toLowerCase()) {
                    case 'admin':
                        navigate("/admindashboard");
                        break;
                    case 'manager':
                        navigate("/managerdashboard");
                        break;
                    case 'stocksupervisor':
                        navigate("/stocksupervisordashboard");
                        break;
                    case 'sitesupervisor': // Corrected role to lowercase
                        navigate("/Dashboard");
                        break;
                    default:
                        throw new Error('Unknown role');
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
            });
        } else {
            console.error('Form validation errors:', validationErrors);
        }
    }

    return (
        <div className='background'>
            <div className='loginconatin'>
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1 className='name'> Dilum BMK Engineers (Pvt)Ltd. </h1>
                        <img className="englogo" src={Login} alt='' />
                        <h1>Login</h1>

                        <div className='input-box'>
                            <label htmlFor='username'>Username</label>
                            <input
                                type='email'
                                placeholder='Email'
                                value={values.username}
                                name='username'
                                onChange={handleChange}
                            />
                            {errors.username && <p style={{ color: "red", fontSize: "13px" }}>{errors.username}</p>}
                            <FaUser className='icon' />
                        </div>

                        <div className='input-box'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                placeholder='password'
                                value={values.password}
                                name='password'
                                onChange={handleChange}
                            />
                            {errors.password && <p style={{ color: "red", fontSize: "13px" }}>{errors.password}</p>}
                            <FaLock className='icon' />
                        </div>

                        <button className='submit' type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
