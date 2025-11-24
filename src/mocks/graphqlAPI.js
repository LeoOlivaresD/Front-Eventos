// Datos mock (mismo que REST)
const eventos = [
  {
    id: 1,
    titulo: "Concierto de Rock",
    categoria: "Conciertos",
    fecha: "2025-12-15",
    lugar: "Estadio Nacional",
    descripcion: "Un increíble concierto de rock en vivo",
    artista: "The Rockers",
    precio: 50
  },
  {
    id: 2,
    titulo: "Conferencia de Tecnología",
    categoria: "Conferencias",
    fecha: "2025-12-20",
    lugar: "Centro de Convenciones",
    descripcion: "Las últimas tendencias en tecnología e IA",
    ponente: "Dr. Juan Silva",
    precio: 30
  },
  {
    id: 3,
    titulo: "Festival de Jazz",
    categoria: "Conciertos",
    fecha: "2025-12-25",
    lugar: "Teatro Municipal",
    descripcion: "Noches de jazz clásico y moderno",
    artista: "Jazz Masters",
    precio: 40
  },
  {
    id: 4,
    titulo: "Workshop de Diseño UX",
    categoria: "Conferencias",
    fecha: "2026-01-10",
    lugar: "Centro de Innovación",
    descripcion: "Aprende diseño UX/UI desde cero",
    ponente: "María González",
    precio: 25
  }
];

// Simulación de GraphQL
export const queryEventoByIdGraphQL = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const evento = eventos.find(e => e.id === parseInt(id));
      if (evento) {
        resolve(evento);
      } else {
        reject(new Error("Evento no encontrado en GraphQL"));
      }
    }, 400);
  });
};

export const queryAllEventosGraphQL = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(eventos);
    }, 500);
  });
};
