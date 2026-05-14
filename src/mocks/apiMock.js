// src/mocks/apiMock.js

const MOCK_USERS = [
  { id: 1, username: 'admin', password: 'password123', name: 'Administrador Principal', role: 'admin' },
  { id: 2, username: 'juan', password: 'juan123', name: 'Juan Pérez', role: 'user' }
];

// Nuestra base de datos en memoria (Ya no son datos fijos en la tabla)
let MOCK_RECORDS = [
  { id: 1, documento: '12345678', codigo: 'C001', nombre: 'Juan Pérez', correo: 'juan@email.com', estado: 'activo', telefono: '+51 987654321', fechaCreacion: '10/05/2026' },
  { id: 2, documento: '87654321', codigo: 'C002', nombre: 'Ana Gómez', correo: 'ana@email.com', estado: 'pendiente', telefono: '+51 912345678', fechaCreacion: '11/05/2026' },
];

export const mockFetch = async (url, options = {}) => {
  const method = options.method || 'GET';

  return new Promise((resolve) => {
    setTimeout(() => {
      
      // 1. ENDPOINT: LOGIN (POST /api/auth/login)
      if (url === '/api/auth/login' && method === 'POST') {
        const body = JSON.parse(options.body);
        const user = MOCK_USERS.find(u => u.username === body.username && u.password === body.password);
        if (user) {
          const { password, ...userData } = user;
          resolve({ ok: true, status: 200, json: async () => ({ token: 'fake-jwt-token-abcdef', user: userData }) });
        } else {
          resolve({ ok: false, status: 401, json: async () => ({ message: 'Usuario o contraseña incorrectos' }) });
        }
        return;
      }

      // 2. ENDPOINT: OBTENER REGISTROS (GET /api/records)
      if (url === '/api/records' && method === 'GET') {
        resolve({
          ok: true,
          status: 200,
          json: async () => ([...MOCK_RECORDS])
        });
        return;
      }

      // 3. ENDPOINT: CREAR REGISTRO (POST /api/records)
      if (url === '/api/records' && method === 'POST') {
        const newRecord = JSON.parse(options.body);
        const isDuplicate = MOCK_RECORDS.some(r => r.correo === newRecord.correo || r.documento === newRecord.documento);

        if (isDuplicate) {
          resolve({ ok: false, status: 400, json: async () => ({ message: "Error: Ya existe un contacto con este correo o documento." }) });
          return;
        }

        const recordWithId = {
          ...newRecord,
          id: Date.now(),
          codigo: `C00${MOCK_RECORDS.length + 1}`,
          fechaCreacion: new Date().toLocaleDateString()
        };

        MOCK_RECORDS.push(recordWithId);
        resolve({ ok: true, status: 201, json: async () => ({ success: true, message: "Registro creado", data: recordWithId }) });
        return;
      }

      // 4. ENDPOINT: ACTUALIZAR ESTADO (PUT /api/records/:id/status)
      const putStatusRegex = /^\/api\/records\/(\d+)\/status$/;
      const statusMatch = url.match(putStatusRegex);

      if (statusMatch && method === 'PUT') {
        const id = parseInt(statusMatch[1]);
        const body = JSON.parse(options.body);
        const recordIndex = MOCK_RECORDS.findIndex(r => r.id === id);

        if (recordIndex !== -1) {
          MOCK_RECORDS[recordIndex].estado = body.estado; 
          resolve({ ok: true, status: 200, json: async () => ({ success: true, message: 'Estado actualizado' }) });
        } else {
          resolve({ ok: false, status: 404, json: async () => ({ message: 'Registro no encontrado' }) });
        }
        return;
      }

      // Si no coincide ninguna ruta, devolvemos el error 404
      resolve({ ok: false, status: 404, json: async () => ({ message: 'Endpoint no encontrado' }) });
      
    }, 800); // 0.8 segundos de carga simulada
  });
};