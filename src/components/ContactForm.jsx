// src/components/ContactForm.jsx
import React, { useState } from 'react';
import { createRecord } from '../services/recordsService';
import './ContactForm.css'; // <-- 1. Importamos los estilos modernos

const ContactForm = ({ onRecordAdded }) => { 
  const [formData, setFormData] = useState({
    nombre: '', documento: '', correo: '', telefono: '', estado: 'activo'
  });

  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const validate = () => {
    let newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (formData.documento.length < 8) newErrors.documento = "El documento debe tener al menos 8 caracteres";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) newErrors.correo = "El formato del correo no es válido";
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es obligatorio";

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setApiError(null); 
    setSuccessMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError(null);
    setSuccessMsg(null);

    try {
      const response = await createRecord(formData);
      
      setSuccessMsg(response.message);
      setFormData({ nombre: '', documento: '', correo: '', telefono: '', estado: 'activo' });
      
      if (onRecordAdded) {
        onRecordAdded();
      }
      
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <h2>Registro de Contacto</h2>
      
      {/* Mensajes de Alerta */}
      {apiError && <div className="contact-api-error">{apiError}</div>}
      {successMsg && <div className="contact-success-msg">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-field">
          <label>Nombre:</label>
          <input name="nombre" value={formData.nombre} onChange={handleChange} disabled={loading} />
          {formErrors.nombre && <span className="field-error-text">{formErrors.nombre}</span>}
        </div>

        <div className="contact-field">
          <label>Documento:</label>
          <input name="documento" value={formData.documento} onChange={handleChange} disabled={loading} />
          {formErrors.documento && <span className="field-error-text">{formErrors.documento}</span>}
        </div>

        <div className="contact-field">
          <label>Correo Electrónico:</label>
          <input name="correo" type="email" value={formData.correo} onChange={handleChange} disabled={loading} />
          {formErrors.correo && <span className="field-error-text">{formErrors.correo}</span>}
        </div>

        <div className="contact-field">
          <label>Teléfono:</label>
          <input name="telefono" value={formData.telefono} onChange={handleChange} disabled={loading} />
          {formErrors.telefono && <span className="field-error-text">{formErrors.telefono}</span>}
        </div>

        <div className="contact-field">
          <label>Estado:</label>
          <select name="estado" value={formData.estado} onChange={handleChange} disabled={loading}>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="pendiente">Pendiente</option>
          </select>
        </div>

        <button type="submit" className="contact-button" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;