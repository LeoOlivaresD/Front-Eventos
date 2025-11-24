# 🎭 Centro de Eventos - Front-End

Una aplicación React moderna para explorar y comprar entradas a eventos. Demuestra el uso de **REST API** y **GraphQL** para cargar datos de diferentes formas.

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple?logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple?logo=bootstrap)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Demo en Vivo

**[Ver aplicación en GitHub Pages](https://LeoOlivaresD.github.io/Front-Eventos/)**

---

## ✨ Características Principales

### 📡 **Dos APIs Diferentes**
- ✅ **REST API** - Carga la lista de eventos en la página principal
- ✅ **GraphQL** - Carga detalles individuales de cada evento
- 📊 **Badges informativos** - Muestra qué API se está usando

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

APIs:
├── REST API Mock (src/mocks/restAPI.js)
└── GraphQL Mock (src/mocks/graphqlAPI.js)

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

**Propósito:** Carga detalles de un evento específico en `EventPage.jsx`

---

## 🗂️ Estructura del Proyecto

```
Front-Eventos/
├── public/
│   └── images/                    # Imágenes locales
│       ├── concierto-rock.jpg
│       ├── conferencia-tech.jpg
│       ├── festival-jazz.jpg
│       └── workshop-ux.webp
├── src/
│   ├── assets/                    # Recursos
│   ├── components/
│   │   ├── AppRoutes.jsx         # Rutas principales
│   │   ├── EventCard.jsx         # Tarjeta de evento
│   │   ├── EventList.jsx         # Lista de eventos (REST API)
│   │   ├── Footer.jsx            # Footer
│   │   └── APIIndicator.jsx      # Indicador de API
│   ├── pages/
│   │   ├── Home.jsx              # Página principal
│   │   └── EventPage.jsx         # Detalles del evento (GraphQL)
│   ├── mocks/
│   │   ├── restAPI.js            # Mock REST API
│   │   └── graphqlAPI.js         # Mock GraphQL API
│   ├── App.jsx                   # Componente principal
│   ├── App.css                   # Estilos globales
│   ├── index.css                 # Estilos base
│   └── main.jsx                  # Punto de entrada
├── vite.config.js                # Configuración Vite
├── package.json                  # Dependencias
└── README.md                     # Este archivo
```

---

## 🚀 Scripts Disponibles

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Deploy a GitHub Pages
npm run deploy

# Linter
npm run lint
```

---

## 📊 Demostrando REST vs GraphQL

### En la Consola (F12 → Console)

**Cuando cargas la página principal:**
```
📡 API: REST - Cargando eventos desde restAPI.js
✅ API: REST - Datos recibidos correctamente
Array(4) [ {...}, {...}, {...}, {...} ]
```

**Cuando haces click en "Ver Detalles":**
```
📡 API: GraphQL - Cargando evento ID 1 desde graphqlAPI.js
✅ API: GraphQL - Evento recibido correctamente
Object { id: 1, titulo: "Concierto de Rock", ... }
```

### En la Interfaz

- **Página Home:** Badge verde mostrando "📡 Datos cargados con: REST API"
- **Página Detalles:** Badge naranja mostrando "📡 Evento cargado con: GraphQL"

---

## 🎨 Paleta de Colores

```
Primario:     #667eea (Azul/Púrpura)
Secundario:   #764ba2 (Púrpura oscuro)
Fondo:        #0f0f0f (Negro)
Fondo Alt:    #1a1a2e (Gris oscuro)
Éxito:        #10b981 (Verde)
Advertencia:  #f59e0b (Naranja)
```

---

## 🔧 Configuración de GitHub Pages

El proyecto está configurado para funcionar en GitHub Pages bajo:
```
https://github.com/LeoOlivaresD/Front-Eventos
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
✅ **Mocks de APIs** (REST y GraphQL)
✅ **Styling con CSS-in-JS** y Bootstrap
✅ **Manejo de errores y loading states**
✅ **Modales e interactividad**
✅ **Deploy a GitHub Pages**

---

## 👨‍💻 Autor

**Leo Olivares D.**
- GitHub: [@LeoOlivaresD](https://github.com/LeoOlivaresD)
---

