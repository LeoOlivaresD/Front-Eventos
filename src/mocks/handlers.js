import { http, graphql } from 'msw';
import { eventos } from './data';

// Handlers REST - Con rutas relativas
export const restHandlers = [
  http.get('/api/eventos', () => {
    console.log('%cMSW: Interceptó GET /api/eventos (REST)', 'color: #10b981; font-weight: bold; font-size: 12px');
    return new Response(JSON.stringify(eventos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }),

  http.get('/api/evento/:id', ({ params }) => {
    const evento = eventos.find(e => e.id === parseInt(params.id));
    console.log('%cMSW: Interceptó GET /api/evento/:id (REST)', 'color: #10b981; font-weight: bold; font-size: 12px');
    
    if (evento) {
      return new Response(JSON.stringify(evento), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(null, { status: 404 });
  })
];

// Handlers GraphQL - Con rutas relativas
export const graphqlHandlers = [
  graphql.query('GetEventos', () => {
    console.log('%cMSW: Interceptó Query GetEventos (GraphQL)', 'color: #f59e0b; font-weight: bold; font-size: 12px');
    return new Response(
      JSON.stringify({ data: { eventos } }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }),

  graphql.query('GetEventoById', ({ variables }) => {
    const evento = eventos.find(e => e.id === variables.id);
    console.log('%cMSW: Interceptó Query GetEventoById (GraphQL)', 'color: #f59e0b; font-weight: bold; font-size: 12px');
    
    if (evento) {
      return new Response(
        JSON.stringify({ data: { evento } }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({ errors: [{ message: 'Evento no encontrado' }] }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  })
];

export const handlers = [...restHandlers, ...graphqlHandlers];