// src/components/RecordDetail.jsx
import React from 'react';
import './RecordDetail.css'; // <-- Importamos los estilos

const RecordDetail = ({ record, onBack }) => {
  return (
    <div className="detail-wrapper">
      <button onClick={onBack} className="btn-back">
        ← Volver a la lista
      </button>
      
      <div className="detail-card">
        <h2 className="detail-title">Detalles del Registro</h2>
        
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Código</span>
            <span className="detail-value">{record.codigo}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Nombre Completo</span>
            <span className="detail-value">{record.nombre}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Correo Electrónico</span>
            <span className="detail-value">{record.correo}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Teléfono</span>
            <span className="detail-value">{record.telefono}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Fecha de Creación</span>
            <span className="detail-value">{record.fechaCreacion || 'No registrada'}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Estado Actual</span>
            {/* Aplicamos la clase dinámica para el color de la píldora */}
            <span className={`detail-status ${record.estado}`}>
              {record.estado}
            </span>
          </div>
        </div>

        <hr className="detail-divider" />
        
        <div className="detail-item" style={{ width: '100%' }}>
          <span className="detail-label">Observaciones Adicionales</span>
          <div className="detail-observations-box">
            {record.observaciones || 'No se han registrado observaciones adicionales para este contacto.'}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default RecordDetail;