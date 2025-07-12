import { useState } from 'react';
import '../styles/ForgotPassword.css'
import { Navigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRequest = async () => {
    const res = await fetch('http://localhost:5000/api/reset-password/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
    Navigate('/reset')
  };

  return (
    <div className="container1">
      <h2 className='h22'>Forgot Password</h2>
      <input
        className='input1'
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRequest} className='button1'>Send Reset Link</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
