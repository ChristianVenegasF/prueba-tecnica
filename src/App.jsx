// src/App.jsx
import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import RecordsTable from './components/RecordsTable';
import LoginForm from './components/LoginForm';
import { checkPermission, PERMISSIONS } from './utils/permissions';
import './App.css'; // <-- 1. Importamos el CSS general

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null); 
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRecordAdded = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const handleLogin = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData)); 
    setToken(newToken);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  if (!token) {
    return (
      <div className="app-wrapper">
        <div className="login-wrapper">
          <h1>Prueba Técnica - React</h1>
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  const canCreate = checkPermission(user?.role, PERMISSIONS.CREATE_RECORD);

  return (
    <div className="app-wrapper">
      <div className="app-container">
        
        {/* Cabecera / Header Moderno */}
        <header className="app-header">
          <div className="app-title-group">
            <h1>Sistema de Registros</h1>
            <div className="user-badge">
              <span>👤 Conectado como:</span>
              <strong>{user?.name} ({user?.role})</strong>
            </div>
          </div>
          
          <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </header>
        
        {/* Renderizado de Componentes */}
        {canCreate && <ContactForm onRecordAdded={handleRecordAdded} />}
        
        <RecordsTable refreshKey={refreshKey} userRole={user?.role} />
        
      </div>
    </div>
  )
}

export default App;