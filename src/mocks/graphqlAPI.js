// Datos mock (mismo que REST)
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
    imagen: new URL('../assets/images/concierto-rock.jpg', import.meta.url).href
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
    imagen: new URL('../assets/images/conferencia-tech.jpeg', import.meta.url).href
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
    imagen: new URL('../assets/images/festival-jazz.jpg', import.meta.url).href
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
    imagen: new URL('../assets/images/workshop-ux.webp', import.meta.url).href
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
