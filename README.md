# 🎭 Centro de Eventos - Front-End

Una aplicación React moderna para explorar y comprar entradas a eventos. Demuestra el uso de **REST API** y **GraphQL** para cargar datos de diferentes formas, con **MSW (Mock Service Worker)** en desarrollo.

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple?logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple?logo=bootstrap)
![MSW](https://img.shields.io/badge/MSW-2.0.0-orange?logo=mockserviceworker)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Demo en Vivo

**[Ver aplicación en GitHub Pages](https://LeoOlivaresD.github.io/Front-Eventos/)**

---

## ✨ Características Principales

### 📡 **Dos APIs Diferentes**
- ✅ **REST API** - Carga la lista de eventos en la página principal
- ✅ **GraphQL** - Carga detalles individuales de cada evento
- 🔄 **MSW en desarrollo** - Simula peticiones HTTP reales con Service Workers
- 📊 **Badges informativos** - Muestra qué API se está usando
- 🏭 **Modo producción** - Usa datos mock directamente sin HTTP

### 🎨 **Diseño Profesional**
- 🌙 Tema oscuro con gradientes modernos
- 📱 Totalmente responsivo (mobile, tablet, desktop)
- ✨ Animaciones suaves y transiciones
- 💫 Efectos hover profesionales

### 🛍️ **Funcionalidades**
- 📋 Lista de eventos con imágenes
- 🔍 Detalles completos de cada evento
- 🎫 Modal de compra de entradas con cantidad configurable
- 💰 Cálculo automático de total
- 🎉 Confirmación visual de compra exitosa
- 🔗 Navegación entre páginas con React Router

### 📸 **Imágenes Locales**
- Alojadas en `public/images/`
- Funciona tanto en desarrollo local como en GitHub Pages

### 📱 **Footer Completo**
- Enlaces rápidos
- Redes sociales
- Información de la empresa

---

## 🛠️ Stack Tecnológico
```
Frontend:
├── React 19.2.0 - Librería UI
├── React Router 7.9.6 - Navegación
├── Vite 7.2.4 - Build tool
├── Bootstrap 5.3.8 - Diseño responsivo
└── JavaScript ES6+ - Lenguaje

Mocking & APIs:
├── MSW 2.0.0 - Mock Service Worker (solo desarrollo)
├── REST API Mock (src/mocks/restAPI.js)
├── GraphQL Mock (src/mocks/graphqlAPI.js)
└── Data Mock (src/mocks/data.js) - Datos compartidos

Deploy:
└── GitHub Pages
```

---

## 📦 Instalación

### Requisitos previos
- Node.js 16.x o superior
- npm 8.x o superior

### Pasos de instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/LeoOlivaresD/Front-Eventos.git
cd Front-Eventos
```

2. **Instala dependencias**
```bash
npm install
```

3. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

4. **Abre en tu navegador**
```
http://localhost:5173/
```

---

## 🎯 Cómo Funcionan las APIs

### 🔄 Comportamiento según Entorno

Este proyecto tiene **dos modos de operación**:

#### **🛠️ Modo Desarrollo (npm run dev)**
- Usa **MSW (Mock Service Worker)** para interceptar peticiones HTTP
- Simula un servidor real con rutas `/api/eventos` y `/api/graphql`
- Permite practicar con APIs "reales" (aunque simuladas)
- Los logs muestran que MSW está interceptando las peticiones

#### **🚀 Modo Producción (GitHub Pages)**
- **NO usa MSW** (Service Workers no son confiables en GitHub Pages)
- Devuelve datos mock **directamente** sin hacer peticiones HTTP
- Es más rápido y confiable para sitios estáticos
- Los datos provienen de `src/mocks/data.js`

---

### 📊 REST API (Página Principal)

**Ubicación:** `src/mocks/restAPI.js`

**Función:** `fetchEventosREST()`

**Uso:**
```javascript
import { fetchEventosREST } from '../mocks/restAPI';

// En un componente
useEffect(() => {
  fetchEventosREST().then(eventos => {
    console.log('Eventos cargados:', eventos);
  });
}, []);
```

**Lógica interna:**
```javascript
const isDevelopment = import.meta.env.DEV;

if (isDevelopment) {
  // Usar MSW - petición HTTP a /api/eventos
  const response = await fetch('/api/eventos');
  return response.json();
} else {
  // Producción - devolver datos directamente
  return Promise.resolve(eventos);
}
```

**Propósito:** Carga la lista completa de eventos en `EventList.jsx`

---

### 📡 GraphQL (Página de Detalles)

**Ubicación:** `src/mocks/graphqlAPI.js`

**Función:** `queryEventoByIdGraphQL(id)`

**Uso:**
```javascript
import { queryEventoByIdGraphQL } from '../mocks/graphqlAPI';

// En un componente
useEffect(() => {
  queryEventoByIdGraphQL(1).then(evento => {
    console.log('Evento cargado:', evento);
  });
}, []);
```

**Lógica interna:**
```javascript
const isDevelopment = import.meta.env.DEV;

if (isDevelopment) {
  // Usar MSW - petición POST a /api/graphql
  const response = await fetch('/api/graphql', {
    method: 'POST',
    body: JSON.stringify({ query, variables })
  });
  return response.json();
} else {
  // Producción - filtrar datos directamente
  return Promise.resolve(eventos.find(e => e.id === id));
}
```

**Propósito:** Carga detalles de un evento específico en `EventPage.jsx`

---

## 🗂️ Estructura del Proyecto
```
Front-Eventos/
├── public/
│   ├── images/                    # Imágenes locales
│   │   ├── concierto-rock.jpg
│   │   ├── conferencia-tech.jpeg
│   │   ├── festival-jazz.jpg
│   │   └── workshop-ux.webp
│   └── mockServiceWorker.js       # Service Worker de MSW (solo desarrollo)
├── src/
│   ├── assets/                    # Recursos
│   ├── components/
│   │   ├── AppRoutes.jsx         # Rutas principales
│   │   ├── EventCard.jsx         # Tarjeta de evento
│   │   ├── EventList.jsx         # Lista de eventos (REST API)
│   │   └── Footer.jsx            # Footer
│   ├── pages/
│   │   ├── Home.jsx              # Página principal
│   │   └── EventPage.jsx         # Detalles del evento (GraphQL)
│   ├── mocks/
│   │   ├── data.js               # 🆕 Datos mock compartidos
│   │   ├── handlers.js           # 🆕 Handlers de MSW
│   │   ├── browser.js            # 🆕 Configuración MSW
│   │   ├── restAPI.js            # Mock REST API (con detección de entorno)
│   │   └── graphqlAPI.js         # Mock GraphQL API (con detección de entorno)
│   ├── App.jsx                   # Componente principal
│   ├── App.css                   # Estilos globales
│   ├── index.css                 # Estilos base
│   └── main.jsx                  # Punto de entrada (inicializa MSW)
├── vite.config.js                # Configuración Vite
├── package.json                  # Dependencias
└── README.md                     # Este archivo
```

---

## 🔧 Archivos Clave de MSW

### 📄 `src/mocks/data.js`
Contiene los datos mock compartidos por todas las APIs:
```javascript
export const eventos = [
  { id: 1, titulo: "Concierto de Rock", ... },
  { id: 2, titulo: "Conferencia de Tecnología", ... },
  // ...
];
```

### 📄 `src/mocks/handlers.js`
Define los interceptores de MSW para REST y GraphQL:
```javascript
export const restHandlers = [
  http.get('/api/eventos', () => { ... }),
  http.get('/api/evento/:id', () => { ... })
];

export const graphqlHandlers = [
  graphql.query('GetEventos', () => { ... }),
  graphql.query('GetEventoById', () => { ... })
];
```

### 📄 `src/mocks/browser.js`
Configura el Service Worker de MSW:
```javascript
import { setupWorker } from 'msw/browser';
export const worker = setupWorker(...handlers);
```

### 📄 `src/main.jsx`
Inicializa MSW solo en desarrollo:
```javascript
async function initMSW() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser.js');
    await worker.start({ ... });
  }
}
```

---

## 🚀 Scripts Disponibles
```bash
# Desarrollo local (con MSW activo)
npm run dev

# Build para producción
npm run build

# Preview del build (sin MSW)
npm run preview

# Deploy a GitHub Pages
npm run deploy

# Linter
npm run lint
```

---

## 📊 Demostrando REST vs GraphQL

### En la Consola (F12 → Console)

#### **🛠️ En Desarrollo (npm run dev)**

**Cuando cargas la página principal:**
```
[MSW] Mocking enabled.
🟢 MSW: Interceptó GET /api/eventos (REST)
📡 API: REST - Cargando eventos desde restAPI.js
✅ API: REST - Datos recibidos correctamente
Array(4) [ {...}, {...}, {...}, {...} ]
```

**Cuando haces click en "Ver Detalles":**
```
🟠 MSW: Interceptó Query GetEventoById (GraphQL)
📡 API: GraphQL - Cargando evento ID 1 desde graphqlAPI.js
✅ API: GraphQL - Evento recibido correctamente
Object { id: 1, titulo: "Concierto de Rock", ... }
```

#### **🚀 En Producción (GitHub Pages)**

**Cuando cargas la página principal:**
```
📡 API: REST - Cargando eventos desde restAPI.js
🏭 REST API: Modo producción - usando datos mock directos
✅ API: REST - Datos recibidos correctamente
```

**Cuando haces click en "Ver Detalles":**
```
📡 API: GraphQL - Cargando evento ID 1 desde graphqlAPI.js
🏭 GraphQL: Modo producción - usando datos mock directos
✅ API: GraphQL - Evento recibido correctamente
```

### En la Interfaz

- **Página Home:** Badge verde mostrando "📡 Datos cargados con: REST API"
- **Página Detalles:** Badge naranja mostrando "📡 Evento cargado con: GraphQL"

---

## ❓ FAQ: ¿Por qué no usar MSW en GitHub Pages?

### 🤔 El Problema

**MSW** funciona con Service Workers que interceptan peticiones HTTP. En **GitHub Pages**:

- ❌ No hay servidor backend real
- ❌ Las rutas `/api/eventos` no existen
- ❌ Service Workers pueden fallar al registrarse
- ❌ Hay problemas con el path del `mockServiceWorker.js`

### ✅ La Solución

Implementamos **detección de entorno**:
```javascript
const isDevelopment = import.meta.env.DEV;

if (isDevelopment) {
  // Desarrollo: usar MSW para simular HTTP
  fetch('/api/eventos');
} else {
  // Producción: datos mock directos
  Promise.resolve(datos);
}
```

### 🎯 Ventajas

✅ **Desarrollo realista** - Practicas con peticiones HTTP "reales"
✅ **Producción confiable** - No depende de Service Workers
✅ **Más rápido** - Sin overhead de HTTP en producción
✅ **Educativo** - Muestra ambas técnicas de mocking

---


## 🔧 Configuración de GitHub Pages

El proyecto está configurado para funcionar en GitHub Pages bajo:
```
https://LeoOlivaresD.github.io/Front-Eventos/
```

**Configuración en `vite.config.js`:**
```javascript
export default defineConfig({
  base: '/Front-Eventos/',
  plugins: [react()],
})
```

**Configuración en `AppRoutes.jsx`:**
```javascript
<Router basename="/Front-Eventos/">
```

**Configuración en `package.json`:**
```json
{
  "homepage": "https://LeoOlivaresD.github.io/Front-Eventos/",
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

---

## 📱 Responsividad

La aplicación es completamente responsiva:

- **📱 Mobile** (320px - 576px) - Optimizado para smartphones
- **📱 Tablet** (576px - 992px) - Optimizado para tablets
- **💻 Desktop** (992px+) - Versión completa con todas las características

---

## 🎓 Funcionalidades Educativas

Este proyecto demuestra:

✅ **Componentes funcionales** con React Hooks
✅ **Estado y ciclo de vida** con `useState` y `useEffect`
✅ **Navegación SPA** con React Router
✅ **MSW** - Mock Service Worker para desarrollo
✅ **Detección de entorno** - Diferentes estrategias según dev/prod
✅ **Mocks de APIs** (REST y GraphQL)
✅ **Styling con CSS** y Bootstrap
✅ **Manejo de errores y loading states**
✅ **Modales e interactividad**
✅ **Deploy a GitHub Pages**
✅ **Solución de problemas de producción**

---

## 🐛 Troubleshooting

### Problema: "Failed to load resource: 404" en GitHub Pages

**Causa:** MSW no funciona en producción estática

**Solución:** Ya implementada - el código detecta el entorno y usa datos mock directos

### Problema: Imágenes no cargan en GitHub Pages

**Causa:** Rutas incorrectas para el `basename`

**Solución:** Usar rutas relativas o absolutas con `/Front-Eventos/`

### Problema: MSW no intercepta en desarrollo

**Causa:** Service Worker no registrado correctamente

**Solución:** 
1. Verifica que `public/mockServiceWorker.js` existe
2. Reinicia el servidor (`npm run dev`)
3. Limpia cache del navegador

---

## 📚 Recursos de Aprendizaje

- [MSW Documentation](https://mswjs.io/)
- [React Router](https://reactrouter.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [GraphQL Basics](https://graphql.org/learn/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 👨‍💻 Autor

**Leo Olivares D.**
- GitHub: [@LeoOlivaresD](https://github.com/LeoOlivaresD)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---
