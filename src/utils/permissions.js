// src/utils/permissions.js

// Definimos todas las acciones posibles en nuestro sistema
export const PERMISSIONS = {
  CREATE_RECORD: 'CREATE_RECORD',
  TOGGLE_STATUS: 'TOGGLE_STATUS',
  VIEW_DETAILS: 'VIEW_DETAILS'
};

// Mapeamos qué roles tienen acceso a qué acciones
const ROLE_PERMISSIONS = {
  admin: [PERMISSIONS.CREATE_RECORD, PERMISSIONS.TOGGLE_STATUS, PERMISSIONS.VIEW_DETAILS],
  user: [PERMISSIONS.VIEW_DETAILS] // El usuario normal solo puede ver detalles
};

// Función reutilizable para verificar si un rol tiene permiso para una acción
export const checkPermission = (role, permission) => {
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
};