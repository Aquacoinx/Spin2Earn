import React, { useState } from 'react';

const AuthForm = ({ type, onSubmit, formData, setFormData, loading }) => {
  const isLogin = type === 'login';
  const [showType, setShowType] = useState('password');

  const toggleShow = () => {
    setShowType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <form onSubmit={onSubmit} className="card" style={{ maxWidth: '400px', margin: 'auto' }}>
      {!isLogin && (
        <input
          type="text"
          placeholder="Username"
          value={formData.username || ''}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="btn"
          style={{ marginBottom: '1rem' }}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="btn"
        style={{ marginBottom: '1rem' }}
      />

      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <input
          type={showType}
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="btn"
          style={{ width: '100%' }}
        />
        <span
          onClick={toggleShow}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: '#007bff',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}
        >
          {showType === 'password' ? 'Show' : 'Hide'}
        </span>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%' }}
        disabled={loading}
      >
        {loading ? (
          <span className="spinner" />
        ) : (
          isLogin ? 'Login' : 'Create Account'
        )}
      </button>
    </form>
  );
};

export default AuthForm;
