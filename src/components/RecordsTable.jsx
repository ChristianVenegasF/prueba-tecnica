// src/components/RecordsTable.jsx
import React, { useState, useEffect } from 'react';
import RecordDetail from './RecordDetail';
import { getRecords, updateRecordStatus } from '../services/recordsService'; 
import { checkPermission, PERMISSIONS } from '../utils/permissions';
import './RecordsTable.css'; 

const RecordsTable = ({ refreshKey, userRole }) => {
  const [records, setRecords] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [selectedRecord, setSelectedRecord] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getRecords();
        setRecords(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

  const handleToggleStatus = async (e, record) => {
    e.stopPropagation(); 
    const newStatus = record.estado === 'activo' ? 'inactivo' : 'activo';

    try {
      const response = await updateRecordStatus(record.id, newStatus);
      if (response.success) {
        setRecords(prevRecords => 
          prevRecords.map(r => r.id === record.id ? { ...r, estado: newStatus } : r)
        );
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const filteredRecords = records.filter((record) => {
    const matchSearch = 
      record.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'todos' || record.estado === statusFilter;
    return matchSearch && matchStatus;
  });

  if (selectedRecord) {
    return <RecordDetail record={selectedRecord} onBack={() => setSelectedRecord(null)} />;
  }

  if (loading) {
    return <div className="table-message">Cargando registros... ⏳</div>;
  }

  if (error) {
    return <div className="table-message table-error-msg">❌ {error}</div>;
  }

  const canToggleStatus = checkPermission(userRole, PERMISSIONS.TOGGLE_STATUS);
  const canViewDetails = checkPermission(userRole, PERMISSIONS.VIEW_DETAILS);

  return (
    <div className="table-container">
      <h2 className="table-title">Lista de Registros</h2>
      
      <div className="table-filters">
        <input 
          type="text" 
          placeholder="Buscar por código o nombre..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="table-search"
        />
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="table-select"
        >
          <option value="todos">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="pendiente">Pendiente</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      <table className="records-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Estado</th>
            {canToggleStatus && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <tr 
                key={record.id} 
                onClick={() => canViewDetails && setSelectedRecord(record)} 
                className={canViewDetails ? 'row-clickable' : ''}
              >
                <td><strong>{record.codigo}</strong></td>
                <td>{record.nombre}</td>
                <td>{record.correo}</td>
                <td>
                   {/* Asignamos la clase de color dinámicamente según el estado */}
                   <span className={`status-badge status-${record.estado}`}>
                     {record.estado}
                   </span>
                </td>
                {canToggleStatus && (
                  <td>
                    <button 
                      onClick={(e) => handleToggleStatus(e, record)}
                      className={`action-btn ${record.estado === 'activo' ? 'btn-deactivate' : 'btn-activate'}`}
                    >
                      {record.estado === 'activo' ? 'Desactivar' : 'Activar'}
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="table-message">
                📭 No se encontraron registros que coincidan con tu búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsTable;
