import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../src/context/UserContext';

const LogoutButton = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch('https://spin2winapi-wfc9.onrender.com/logout', {
        method: 'POST',
      });

      const data = await res.json();
      if (res.ok) {
        logout(); // Clear context + localStorage
        alert('👋 Logged out successfully!');
        navigate('/login'); // Redirect to login page
      } else {
        alert(data.error || '❌ Logout failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return <button onClick={handleLogout} className='btn'>Logout</button>;
};

export default LogoutButton;
