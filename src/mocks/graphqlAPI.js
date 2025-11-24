import { eventos } from './data';

const isDevelopment = import.meta.env.DEV;

export const queryEventoByIdGraphQL = async (id) => {
  console.log('%cGraphQL: Pidiendo evento con ID ' + id, 'color: #f59e0b; font-weight: bold; font-size: 12px');
  
  if (isDevelopment) {
    // En desarrollo, usar MSW
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
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
        `,
        variables: { id: parseInt(id) }
      })
    });
    const data = await response.json();
    if (data.errors) throw new Error(data.errors[0].message);
    return data.data.evento;
  } else {
    // En producción, devolver datos mock directamente
    console.log('%cGraphQL: Modo producción - usando datos mock directos', 'color: #f59e0b; font-weight: bold; font-size: 12px');
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

export const queryAllEventosGraphQL = async () => {
  console.log('%cGraphQL: Pidiendo todos los eventos', 'color: #f59e0b; font-weight: bold; font-size: 12px');
  
  if (isDevelopment) {
    // En desarrollo, usar MSW
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetEventos {
            eventos {
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
        `
      })
    });
    const data = await response.json();
    if (data.errors) throw new Error(data.errors[0].message);
    return data.data.eventos;
  } else {
    // En producción, devolver datos mock directamente
    console.log('%cGraphQL: Modo producción - usando datos mock directos', 'color: #f59e0b; font-weight: bold; font-size: 12px');
    return new Promise((resolve) => {
      setTimeout(() => resolve(eventos), 100);
    });
  }
};