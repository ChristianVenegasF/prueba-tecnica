```markdown
# 📋 Sistema de Registros - Panel Administrativo (Prueba Técnica)

Este proyecto es una aplicación web de una sola página (SPA) desarrollada con **React** y **Vite**. Funciona como un panel administrativo (Dashboard) que incluye autenticación, gestión de roles (RBAC), operaciones CRUD de contactos y una API simulada (Mock) para funcionar de manera local sin necesidad de un backend real.

---

## 🚀 Guía de Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local:

1. **Clonar el repositorio o descargar el código.**
2. **Instalar las dependencias:**
   Abre tu terminal en la carpeta raíz del proyecto y ejecuta:
   ```bash
   npm install

```

3. **Ejecutar el entorno de desarrollo:**
```bash
npm run dev

```


4. **Abrir en el navegador:**
Por lo general, Vite levanta el servidor en `http://localhost:5173`.

---

## 🔐 Credenciales de Prueba

Para probar los distintos permisos y roles, utiliza los siguientes usuarios simulados:

* **Administrador** (Puede crear, cambiar estados y ver detalles):
* **Usuario:** `admin`
* **Contraseña:** `password123`


* **Usuario Regular** (Solo lectura):
* **Usuario:** `juan`
* **Contraseña:** `juan123`



---

## 📂 Estructura del Proyecto

A continuación se detalla la arquitectura de la carpeta `src/` y el propósito de cada archivo:

### 📁 `src/components/`

Contiene los componentes visuales e interactivos de la interfaz de usuario.

* **`ContactForm.jsx` / `.css`:** Formulario con validaciones (nombre, documento, correo, teléfono) para registrar nuevos contactos.
* **`LoginForm.jsx` / `.css`:** Pantalla inicial de autenticación que captura las credenciales del usuario y maneja los estados de carga o error.
* **`RecordsTable.jsx` / `.css`:** Tabla principal que lista los registros. Incluye filtros de búsqueda (por texto y por estado) y renderizado condicional de botones según el rol del usuario.
* **`RecordDetail.jsx` / `.css`:** Vista de detalle que muestra la información completa de un registro específico utilizando un diseño de cuadrícula (Grid) de dos columnas.

### 📁 `src/mocks/`

* **`apiMock.js`:** El "falso backend". Contiene una base de datos en memoria (arrays) y una función `mockFetch` que intercepta las peticiones HTTP y simula las respuestas de una API RESTful (con retrasos simulados de red).

### 📁 `src/services/`

Capa de abstracción para la comunicación con la API. Si en el futuro se conecta a un backend real, solo se modifican estos archivos.

* **`authService.js`:** Funciones relacionadas con la autenticación (ej. enviar credenciales al endpoint `/api/auth/login`).
* **`recordsService.js`:** Funciones para obtener la lista de registros, crear nuevos contactos y actualizar el estado (operaciones CRUD).

### 📁 `src/utils/`

* **`permissions.js`:** Utilidad centralizada que define los roles (`admin`, `user`) y evalúa si un usuario tiene permiso para ejecutar acciones específicas (`CREATE_RECORD`, `TOGGLE_STATUS`, etc.).

### 📁 Archivos Principales (`src/`)

* **`App.jsx` / `App.css`:** El componente orquestador. Controla la sesión activa (Local Storage), el diseño general (Layout del Dashboard con la cabecera) y decide qué componentes mostrar.
* **`main.jsx`:** El punto de entrada de la aplicación de React. Renderiza `App` dentro del DOM.
* **`index.css`:** Estilos globales (reseteo de márgenes, fuentes predeterminadas, etc.).

### 📁 Otras Carpetas

* **`src/api/`:** Carpeta reservada para la configuración de clientes HTTP reales (como Axios) en futuras versiones.
* **`src/assets/`:** Archivos estáticos como imágenes, logos o iconos.
* **`src/pages/`:** Preparada para alojar vistas completas si el proyecto escala e implementa enrutamiento (React Router).

---

## ✨ Características y Requisitos Cumplidos

* **Login y Gestión de Sesión:** Autenticación simulada y almacenamiento del estado de sesión.
* **Formulario Controlado:** Registro de contactos con validaciones estrictas y manejo de estado.
* **Listado y Filtros:** Tabla interactiva que permite filtrar por código, nombre y estado en tiempo real.
* **Mock de API:** Simulación completa de llamadas HTTP asíncronas sin necesidad de levantar un servidor Node/Express.
* **Módulo Administrativo con Permisos:** Protección de botones y vistas basada en el rol del usuario conectado (`admin` vs `user`).
* **Diseño Moderno:** Interfaz limpia estilo "Dashboard" implementando CSS nativo responsivo.

---

*Desarrollado para evaluación técnica de React.*
