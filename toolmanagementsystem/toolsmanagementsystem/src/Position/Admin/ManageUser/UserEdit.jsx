import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditUser() {
    const [user, setUser] = useState({
        contact: "",
        firstname: "",
        lastname: "",
        nic: "",
        password: "",
        role: "",
        username: ""
    });

    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/users/${id}`);
            setUser(result.data);
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8080//userupdate/${id}`, user);
            alert("User updated successfully");
            // Optionally, redirect or perform other actions after successful update
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className='text-center m-4'>Edit User Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='card'>
                            <div className='card-header'>
                                Details of user id: {id}
                                <ul className='list-group list-group-flush'>
                                    <li className='list-group-item'>
                                        <b>First Name:</b>
                                        <br />
                                        <input type="text" name="firstname" value={user.firstname} onChange={handleInputChange} />
                                    </li>
                                    <li className='list-group-item'>
                                        <b>Last Name:</b>
                                        <br />
                                        <input type="text" name="lastname" value={user.lastname} onChange={handleInputChange} />
                                    </li>
                                    <li className='list-group-item'>
                                        <b>Contact:</b>
                                        <br />
                                        <input type="text" name="contact" value={user.contact} onChange={handleInputChange} />
                                    </li>
                                    <li className='list-group-item'>
                                        <b>NIC:</b>
                                        <br />
                                        <input type="text" name="nic" value={user.nic} onChange={handleInputChange} />
                                    </li>
                                    <li className='list-group-item'>
                                        <b>Password:</b>
                                        <br />
                                        <input type="password" name="password" value={user.password} onChange={handleInputChange} />
                                    </li>
                                    <li className='list-group-item'>
                                        <b>Role:</b>
                                        <br />
                                        <input type="text" name="role" value={user.role} onChange={handleInputChange} />
                                    </li>
                                    <li className='list-group-item'>
                                        <b>Username:</b>
                                        <br />
                                        <input type="text" name="username" value={user.username} onChange={handleInputChange} />
                                    </li>
                                </ul>
                                <button type="submit" className="btn btn-outline-primary " onSubmit={(e)=>handleSubmit(e)}>
                                    Submit
                                </button>
                                <Link type="cancel" className="btn btn-outline-danger mx-2" to="/UserManage">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                    <Link className="btn btn-primary my-2" to={"/UserManage"}>Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
