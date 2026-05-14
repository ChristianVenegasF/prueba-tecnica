// src/api/httpClient.js
import { mockFetch } from '../mocks/apiMock';

// Leemos las variables de entorno de Vite
const useLocalData = import.meta.env.VITE_USE_LOCAL_DATA === 'true';
const baseUrl = import.meta.env.VITE_API_BASE_URL || '';

export const httpClient = async (endpoint, options = {}) => {
  if (useLocalData) {
    // Modo Desarrollo: Usamos el Mock
    console.log(`🛠️ [Mock API] Petición a: ${endpoint}`);
    return mockFetch(endpoint, options);
  } else {
    // Modo Producción: Usamos la API Real
    console.log(`🌐 [Real API] Petición a: ${baseUrl}${endpoint}`);
    
    // Configuramos headers por defecto para la API real
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    return fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });
  }
};