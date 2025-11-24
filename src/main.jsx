import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import './index.css'

// Inicializar MSW en desarrollo
async function initMSW() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser.js');
    await worker.start({ 
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/Front-Eventos/mockServiceWorker.js'
      }
    });
  }
}

initMSW().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
});