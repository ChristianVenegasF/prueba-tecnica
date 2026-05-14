// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { login } from '../services/authService';
import './LoginForm.css'; // <-- 1. Importamos el archivo CSS

const LoginForm = ({ onLogin }) => { 
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(credentials.username, credentials.password);
      
      if (onLogin) {
        onLogin(response.token, response.user);
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 2. Usamos className en lugar de style
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <div className="login-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-field">
          <label>Usuario:</label>
          <input 
            type="text" 
            name="username" 
            value={credentials.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="login-field">
          <label>Contraseña:</label>
          <input 
            type="password" 
            name="password" 
            value={credentials.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;