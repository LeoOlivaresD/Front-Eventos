# Centro de Eventos - Front-End

Una aplicación React moderna para explorar y comprar entradas a eventos. Demuestra el uso de **REST API**, **GraphQL con Apollo Client** y **MSW (Mock Service Worker)** para simular un backend completo.

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple?logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple?logo=bootstrap)
![Apollo](https://img.shields.io/badge/Apollo_Client-3.11.10-311C87?logo=apollographql)
![MSW](https://img.shields.io/badge/MSW-2.0.0-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Demo en Vivo

**[Ver aplicación en GitHub Pages](https://LeoOlivaresD.github.io/Front-Eventos/)**

---

## Características Principales

### 📡 **Tres Tecnologías Integradas**
- **REST API** - Carga la lista de eventos en la página principal
- **GraphQL + Apollo Client** - Carga detalles individuales de cada evento
- **MSW (Mock Service Worker)** - Simula un backend real en desarrollo
- **Badges informativos** - Muestra qué tecnología se está usando

###  **Diseño Profesional**
-  Tema oscuro con gradientes modernos
-  Totalmente responsivo (mobile, tablet, desktop)
-  Animaciones suaves y transiciones
-  Efectos hover profesionales

### **Funcionalidades**
-  Lista de eventos con imágenes
-  Detalles completos de cada evento
-  Modal de compra de entradas con cantidad configurable
-  Cálculo automático de total
-  Confirmación visual de compra exitosa
-  Navegación entre páginas con React Router

### **Imágenes Locales**
- Alojadas en `public/images/`
- Funciona tanto en desarrollo local como en GitHub Pages

### **Footer Completo**
- Enlaces rápidos
- Redes sociales
- Información de la empresa

---

## Stack Tecnológico
```
Frontend:
├── React 19.2.0 - Librería UI
├── React Router 7.9.6 - Navegación
├── Vite 7.2.4 - Build tool
├── Bootstrap 5.3.8 - Diseño responsivo
└── JavaScript ES6+ - Lenguaje

APIs y Mocking:
├── Apollo Client 3.11.10 - Cliente GraphQL
├── GraphQL 16.12.0 - Lenguaje de consultas
├── MSW 2.0.0 - Mock Service Worker (solo desarrollo)
└── REST API - Fetch nativo del navegador

Deploy:
└── GitHub Pages
```

---

## Instalación

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

##Arquitectura: Cómo Funcionan las 3 Tecnologías Juntas

Este proyecto demuestra la integración de **REST**, **GraphQL con Apollo Client** y **MSW** trabajando simultáneamente.

### Flujo en Desarrollo (con MSW)
```
┌─────────────────────────────────────────────────────────┐
│                    TU NAVEGADOR                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐           ┌──────────────┐           │
│  │   Home       │           │  EventPage   │           │
│  │  (REST API)  │           │  (GraphQL)   │           │
│  └──────┬───────┘           └──────┬───────┘           │
│         │                          │                    │
│         │ fetch('/api/eventos')    │ Apollo Client     │
│         │                          │ POST /graphql     │
│         ▼                          ▼                    │
│  ┌─────────────────────────────────────────┐           │
│  │        MSW (Mock Service Worker)         │           │
│  │         Intercepta peticiones HTTP       │           │
│  └─────────────────┬───────────────────────┘           │
│                    │                                    │
│                    │ handlers.js                        │
│                    ▼                                    │
│  ┌─────────────────────────────────────────┐           │
│  │  REST Handler    │   GraphQL Handler    │           │
│  │  GET /eventos    │   GetEventoById      │           │
│  └─────────────────────────────────────────┘           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Flujo en Producción (GitHub Pages - sin MSW)
```
┌─────────────────────────────────────────────────────────┐
│                  GITHUB PAGES                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐           ┌──────────────┐           │
│  │   Home       │           │  EventPage   │           │
│  │  (REST API)  │           │  (GraphQL)   │           │
│  └──────┬───────┘           └──────┬───────┘           │
│         │                          │                    │
│         │ Datos mock directos      │ Datos mock directos│
│         ▼                          ▼                    │
│  ┌─────────────────────────────────────────┐           │
│  │       eventosMock (array local)          │           │
│  │    NO hay peticiones HTTP reales         │           │
│  └─────────────────────────────────────────┘           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## REST vs. GraphQL en este Proyecto

### **REST API - Lista de Eventos (Home)**

**¿Qué hace?**
- Obtiene la lista completa de eventos
- Usa el método HTTP: `GET /api/eventos`

**Código en `EventList.jsx`:**
```javascript
// En desarrollo: MSW intercepta la petición
const response = await fetch('/api/eventos');
const datos = await response.json();

// En producción: usa datos mock directos
setEventos(eventosMock);
```

**Ventajas:**
- Simple y directo
- Amplio soporte
- Fácil de cachear

---

### **GraphQL + Apollo Client - Detalles del Evento**

**¿Qué hace?**
- Obtiene los detalles de UN evento específico
- El cliente define exactamente qué campos necesita
- Apollo Client maneja automáticamente:
  - Peticiones HTTP
  - Caché de datos
  - Estado de carga y errores

**Código en `EventPage.jsx`:**
```javascript
// Definir la query (qué datos queremos)
const GET_EVENTO = gql`
  query GetEventoById($id: Int!) {
    evento(id: $id) {
      id
      titulo
      categoria
      fecha
      lugar
      descripcion
      artista
      ponente
      precio
      imagen
    }
  }
`;

// Usar Apollo para hacer la consulta
const { loading, error, data } = useQuery(GET_EVENTO, {
  variables: { id: parseInt(id) }
});
```

**Ventajas:**
- Solo pide los datos que necesita
- Caché automático
- Tipado fuerte
- Una sola petición para datos relacionados

---

## Estructura del Proyecto
```
Front-Eventos/
├── public/
│   ├── images/                    # Imágenes de eventos
│   │   ├── concierto-rock.jpg
│   │   ├── conferencia-tech.jpeg
│   │   ├── festival-jazz.jpg
│   │   └── workshop-ux.webp
│   └── mockServiceWorker.js       # Service Worker de MSW
├── src/
│   ├── assets/                    # Recursos
│   ├── components/
│   │   ├── AppRoutes.jsx         # Configuración de rutas
│   │   ├── EventCard.jsx         # Tarjeta de evento
│   │   ├── EventList.jsx         # Lista de eventos (REST)
│   │   └── Footer.jsx            # Footer de la app
│   ├── pages/
│   │   ├── Home.jsx              # Página principal
│   │   └── EventPage.jsx         # Detalles (GraphQL + Apollo)
│   ├── mocks/
│   │   ├── browser.js            # Configuración de MSW
│   │   └── handlers.js           # Handlers REST y GraphQL
│   ├── App.jsx                   # Componente raíz
│   ├── App.css                   # Estilos globales
│   ├── index.css                 # Estilos base
│   └── main.jsx                  # Entry point (inicia MSW)
├── vite.config.js                # Configuración Vite
├── package.json                  # Dependencias
└── README.md                     # Este archivo
```

---

## Archivos Clave

### 📄 `src/mocks/handlers.js`
Contiene los datos mock y define cómo responder a peticiones REST y GraphQL:
```javascript
import { http, HttpResponse, delay, graphql } from 'msw';

const eventos = [ /* datos mock */ ];

// Handler REST
http.get('/api/eventos', async () => {
  await delay(500);
  return HttpResponse.json(eventos);
});

// Handler GraphQL
graphql.query('GetEventoById', async ({ variables }) => {
  await delay(500);
  const evento = eventos.find(e => e.id === variables.id);
  return HttpResponse.json({ data: { evento } });
});
```

### `src/mocks/browser.js`
Configura el Service Worker de MSW:
```javascript
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

### `src/main.jsx`
Inicializa MSW antes de renderizar la app y configura Apollo Client:
```javascript
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

// Inicializar MSW solo en desarrollo
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    return worker.start({ /* config */ });
  }
}

// Configurar Apollo Client
const client = new ApolloClient({
  link: new HttpLink({ uri: "/graphql" }),
  cache: new InMemoryCache()
});

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
});
```

---

## Scripts Disponibles
```bash
# Desarrollo local (con MSW activo)
npm run dev

# Build para producción
npm run build

# Preview del build (sin MSW, simula producción)
npm run preview

# Deploy a GitHub Pages
npm run deploy

# Linter
npm run lint
```

---

## Logs en la Consola

### En Desarrollo (npm run dev)

**Al cargar la página principal:**
```
[MSW] Mocking enabled.
MSW: Interceptó GET /api/eventos (REST)
API: REST - Cargando eventos con MSW
API: REST - Datos cargados correctamente
```

**Al hacer clic en "Ver Detalles":**
```
MSW: Interceptó Query GetEventoById (GraphQL)
Evento cargado con: GraphQL + Apollo Client
```

### En Producción (GitHub Pages)

**Al cargar la página principal:**
```
API: REST - Modo producción (sin MSW)
API: REST - Datos cargados correctamente
```

**Al ver detalles:**
```
Evento cargado con: GraphQL + Apollo Client (Producción)
```

## Configuración de GitHub Pages

El proyecto está configurado para funcionar en GitHub Pages:

**`vite.config.js`:**
```javascript
export default defineConfig({
  base: '/Front-Eventos/',
  plugins: [react()],
})
```

**`AppRoutes.jsx`:**
```javascript
<Router basename="/Front-Eventos/">
```

**`package.json`:**
```json
{
  "homepage": "https://LeoOlivaresD.github.io/Front-Eventos/",
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

---

## Responsividad

La aplicación es completamente responsiva:

- **Mobile** (320px - 576px) - Optimizado para smartphones
- **Tablet** (576px - 992px) - Optimizado para tablets
- **Desktop** (992px+) - Versión completa

---

## Conceptos Demostrados

Este proyecto es educativo y demuestra:

✅ **React Hooks** - useState, useEffect, custom hooks
✅ **React Router** - Navegación SPA
✅ **Apollo Client** - Cliente GraphQL profesional
✅ **GraphQL Queries** - Consultas tipadas
✅ **MSW** - Mock Service Worker para desarrollo
✅ **REST API** - Peticiones HTTP tradicionales
✅ **Detección de entorno** - Diferentes estrategias dev/prod
✅ **Manejo de estado** - Loading, error, data
✅ **Modales e interactividad** - UX profesional
✅ **Deploy a GitHub Pages** - Producción real

---

## Troubleshooting

### "useQuery is not exported from @apollo/client"

**Solución:**
```javascript
// Incorrecto
import { useQuery } from '@apollo/client';

//Correcto
import { useQuery } from '@apollo/client/react';
```

### MSW no intercepta peticiones en desarrollo

**Solución:**
1. Verifica que `public/mockServiceWorker.js` existe
2. Reinicia el servidor: `npm run dev`
3. Limpia caché del navegador (Ctrl + Shift + Delete)

### Errores de Apollo sobre campos faltantes

**Solución:** Asegura que todos los eventos tengan todos los campos (aunque sean `null`):
```javascript
{
  id: 1,
  titulo: "Evento",
  artista: "Artista X",
  ponente: null,  // ← Importante: incluir aunque sea null
  // ... otros campos
}
```
## Autor

**Leo Olivares D.**
- GitHub: [@LeoOlivaresD](https://github.com/LeoOlivaresD)
