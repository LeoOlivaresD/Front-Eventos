import { eventos } from './data';

const isDevelopment = import.meta.env.DEV;

export const fetchEventosREST = async () => {
  console.log('%cREST API: Pidiendo eventos a /api/eventos', 'color: #10b981; font-weight: bold; font-size: 12px');
  
  if (isDevelopment) {
    // En desarrollo, usar MSW
    const response = await fetch('/api/eventos');
    const datos = await response.json();
    return datos;
  } else {
    // En producción, devolver datos mock directamente
    console.log('%cREST API: Modo producción - usando datos mock directos', 'color: #10b981; font-weight: bold; font-size: 12px');
    return new Promise((resolve) => {
      setTimeout(() => resolve(eventos), 100);
    });
  }
};

export const fetchEventoByIdREST = async (id) => {
  console.log('%cREST API: Pidiendo evento con ID ' + id, 'color: #10b981; font-weight: bold; font-size: 12px');
  
  if (isDevelopment) {
    // En desarrollo, usar MSW
    const response = await fetch(`/api/evento/${id}`);
    if (!response.ok) throw new Error('Evento no encontrado');
    return response.json();
  } else {
    // En producción, devolver datos mock directamente
    console.log('%cREST API: Modo producción - usando datos mock directos', 'color: #10b981; font-weight: bold; font-size: 12px');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const evento = eventos.find(e => e.id === parseInt(id));
        if (evento) {
          resolve(evento);
        } else {
          reject(new Error('Evento no encontrado'));
        }
      }, 100);
    });
  }
};