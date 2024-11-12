import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  // State to manage the form data for email and password
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State to handle login error messages
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle changes in input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle the form submission (login)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents form from reloading the page

    try {
      // Send POST request to the backend login API
      const res = await axios.post('http://localhost:3001/api/login', formData);

      // Save the JWT token in localStorage and pass it to the parent component (if needed)
      localStorage.setItem('token', res.data.token); 
      setToken(res.data.token); 

      // Clear any previous error messages
      setErrorMessage('');
      console.log('Login successful:', res.data);
    } catch (error) {
      // If login fails, display an error message
      setErrorMessage('Invalid email or password');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {/* Input field for the email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {/* Input field for the password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {/* Submit button */}
        <button type="submit">Login</button>
      </form>

      {/* Error message display if login fails */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;

