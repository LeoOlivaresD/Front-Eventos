import { http, graphql } from 'msw';

// Datos mock
const eventos = [
  {
    id: 1,
    titulo: "Concierto de Rock",
    categoria: "Conciertos",
    fecha: "2025-12-15",
    lugar: "Estadio Nacional",
    descripcion: "Un increíble concierto de rock en vivo con las mejores bandas del género",
    artista: "The Rockers",
    precio: 50,
    imagen: new URL('/images/concierto-rock.jpg', import.meta.url).href
  },
  {
    id: 2,
    titulo: "Conferencia de Tecnología",
    categoria: "Conferencias",
    fecha: "2025-12-20",
    lugar: "Centro de Convenciones",
    descripcion: "Las últimas tendencias en tecnología e IA con expertos internacionales",
    ponente: "Dr. Juan Silva",
    precio: 30,
    imagen: new URL('/images/conferencia-tech.jpeg', import.meta.url).href
  },
  {
    id: 3,
    titulo: "Festival de Jazz",
    categoria: "Conciertos",
    fecha: "2025-12-25",
    lugar: "Teatro Municipal",
    descripcion: "Noches de jazz clásico y moderno con músicos profesionales",
    artista: "Jazz Masters",
    precio: 40,
    imagen: new URL('/images/festival-jazz.jpg', import.meta.url).href
  },
  {
    id: 4,
    titulo: "Workshop de Diseño UX",
    categoria: "Conferencias",
    fecha: "2026-01-10",
    lugar: "Centro de Innovación",
    descripcion: "Aprende diseño UX/UI desde cero con ejercicios prácticos",
    ponente: "María González",
    precio: 25,
    imagen: new URL('/images/workshop-ux.webp', import.meta.url).href
  }
];

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
