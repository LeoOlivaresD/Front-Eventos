import { http, HttpResponse, delay, graphql } from 'msw';

// Datos mock directamente aquí
const eventos = [
  {
    id: 1,
    titulo: "Concierto de Rock",
    categoria: "Conciertos",
    fecha: "2025-12-15",
    lugar: "Estadio Nacional",
    descripcion: "Un increíble concierto de rock en vivo con las mejores bandas del género",
    artista: "The Rockers",
    ponente: null, 
    precio: 50,
    imagen: "/Front-Eventos/images/concierto-rock.jpg"
  },
  {
    id: 2,
    titulo: "Conferencia de Tecnología",
    categoria: "Conferencias",
    fecha: "2025-12-20",
    lugar: "Centro de Convenciones",
    descripcion: "Las últimas tendencias en tecnología e IA con expertos internacionales",
    artista: null, 
    ponente: "Dr. Juan Silva",
    precio: 30,
    imagen: "/Front-Eventos/images/conferencia-tech.jpeg"
  },
  {
    id: 3,
    titulo: "Festival de Jazz",
    categoria: "Conciertos",
    fecha: "2025-12-25",
    lugar: "Teatro Municipal",
    descripcion: "Noches de jazz clásico y moderno con músicos profesionales",
    artista: "Jazz Masters",
    ponente: null,
    precio: 40,
    imagen: "/Front-Eventos/images/festival-jazz.jpg"
  },
  {
    id: 4,
    titulo: "Workshop de Diseño UX",
    categoria: "Conferencias",
    fecha: "2026-01-10",
    lugar: "Centro de Innovación",
    descripcion: "Aprende diseño UX/UI desde cero con ejercicios prácticos",
    artista: null,
    ponente: "María González",
    precio: 25,
    imagen: "/Front-Eventos/images/workshop-ux.webp"
  }
];

// Handlers REST
const restHandlers = [
  http.get('/api/eventos', async () => {
    await delay(500);
    console.log('%cMSW: Interceptó GET /api/eventos (REST)', 'color: #10b981; font-weight: bold; font-size: 12px');
    return HttpResponse.json(eventos);
  }),

  http.get('/api/evento/:id', async ({ params }) => {
    await delay(500);
    const evento = eventos.find(e => e.id === parseInt(params.id));
    console.log('%cMSW: Interceptó GET /api/evento/:id (REST)', 'color: #10b981; font-weight: bold; font-size: 12px');
    
    if (evento) {
      return HttpResponse.json(evento);
    }
    return new HttpResponse(null, { status: 404 });
  })
];

// Handlers GraphQL
const graphqlHandlers = [
  graphql.query('GetEventos', async () => {
    await delay(500);
    console.log('%cMSW: Interceptó Query GetEventos (GraphQL)', 'color: #f59e0b; font-weight: bold; font-size: 12px');
    return HttpResponse.json({ data: { eventos } });
  }),

  graphql.query('GetEventoById', async ({ variables }) => {
    await delay(500);
    const evento = eventos.find(e => e.id === variables.id);
    console.log('%cMSW: Interceptó Query GetEventoById (GraphQL)', 'color: #f59e0b; font-weight: bold; font-size: 12px');
    
    if (evento) {
      return HttpResponse.json({ data: { evento } });
    }
    return HttpResponse.json({ 
      errors: [{ message: 'Evento no encontrado' }] 
    });
  })
];

export const handlers = [...restHandlers, ...graphqlHandlers];