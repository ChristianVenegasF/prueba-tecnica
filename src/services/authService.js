// src/services/authService.js
import { httpClient } from '../api/httpClient';

export const login = async (username, password) => {
  try {
    const response = await httpClient('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en la autenticación');
    }

    return data;
  } catch (error) {
    throw error;
  }
};