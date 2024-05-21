import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockProfile = () => {
  // State variables to store user information
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nic, setNic] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the form data to your backend for processing
    // For simplicity, let's just log the data to console
    console.log({
      userId,
      username,
      password,
      nic,
      lastName,
      firstName,
      contact,
      role
    });
  };

  // Fetch user details from backend on component mount
  useEffect(() => {
    // Function to fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/authentication/getUserDetails/${userId}`);
        const userData = response.data;
        // Update state with fetched user data
        setUserId(userData.userId);
        setUsername(userData.username);
        setPassword(userData.password);
        setNic(userData.nic);
        setLastName(userData.lastName);
        setFirstName(userData.firstName);
        setContact(userData.contact);
        setRole(userData.role);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    // Call the fetchUserDetails function
    fetchUserDetails();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div>
      <div>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>User ID</label>
            <input
              type="text"
              value={userId}
              disabled // Disable editing of user ID
            />
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>NIC</label>
            <input
              type="text"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label>Contact</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div>
            <label>Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default StockProfile;
