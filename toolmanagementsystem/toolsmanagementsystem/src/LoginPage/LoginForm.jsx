import React, { useEffect, useState } from 'react';
import './LoginForm.css';
import Login from '../../src/images/user1.jpg';
import Validation from '../../src/LoginPage/Validation.js';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

    //sumit function
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
                    case 'sitesupervisor':
                        navigate("/sitesupervisor");
                        break;
                    default:
                        throw new Error('Unknown role');
                }
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
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1 className='name'> Dilum BMK Engineers (Pvt)Ltd. </h1>
                <img className="englogo" src={Login} alt=''/> 
                <h1>Login</h1>

                <div> 
                <TextField
                        id="outlined-username-input"
                        label="Username"
                        type="text"
                        value={values.username}
                        name='username'
                        onChange={handleChange}
                        autoComplete="current-username"
                        fullWidth
                        margin="normal"
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                    
                </div>

               
                <div> 
                    
                   <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        value={values.password}
                        name='password'
                        onChange={handleChange}
                        autoComplete="current-password"
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    
                </div>
                
                <Button
                    type='submit'
                    className='submit'
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Login
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;
