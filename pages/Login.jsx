// src/pages/Login.jsx
import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../src/context/UserContext';
import '../src/index.css';

const Login = () => {
  const { setUser } = useUser();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://spin2winapi-wfc9.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Login successful!');
        setUser(data.user);
        navigate('/spin2win');
      } else {
        alert(data.error || '❌ Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">AquaCoin - <span className="title-accent">Login</span></h1>
        <p className="subtitle">Access your spin-to-win dashboard</p>
      </div>

      <AuthForm
        type="login"
        onSubmit={handleLogin}
        formData={formData}
        setFormData={setFormData}
        loading={loading}
      />

      <div className="change">
        Don't have an Account?
        <button className="btn" onClick={() => navigate('/signup')}>Signup</button>
      </div>
    </div>
  );
};

export default Login;
