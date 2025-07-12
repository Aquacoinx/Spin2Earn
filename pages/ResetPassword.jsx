import { useState, useEffect } from 'react';
import '../styles/ForgotPassword.css'

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get token from URL if redirected by Supabase
    const hash = new URLSearchParams(window.location.hash.substring(1));
    const access_token = hash.get('access_token');
    if (access_token) setToken(access_token);
  }, []);

  const handleReset = async () => {
    const res = await fetch('http://localhost:5000/api/reset-password/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ access_token: token, new_password: password }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="container1">
      <h2 className='h22'>Reset Password</h2>
      <input
      className='input1'
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='button1' onClick={handleReset}>Reset Password</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
