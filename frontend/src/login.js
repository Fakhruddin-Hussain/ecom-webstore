import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5002/api/auth/login', credentials);
      localStorage.setItem('token', res.data.token);
      // localStorage.setItem('role',res.data.role)
      onLogin(res.data.role); // tell app whether user is admin or buyer
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="username" onChange={handleChange} placeholder="Username" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}