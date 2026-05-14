// src/services/recordsService.js
import { httpClient } from '../api/httpClient';

export const getRecords = async () => {
  try {
    const response = await httpClient('/api/records', { method: 'GET' });
    if (!response.ok) throw new Error('Error al obtener registros');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createRecord = async (newRecord) => {
  try {
    const response = await httpClient('/api/records', {
      method: 'POST',
      body: JSON.stringify(newRecord)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al crear el registro');
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateRecordStatus = async (id, newStatus) => {
  try {
    const response = await httpClient(`/api/records/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ estado: newStatus }) 
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Error al actualizar el estado');
    return data;
  } catch (error) {
    throw error;
  }
};