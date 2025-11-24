import { useState, useEffect } from 'react';
import EventCard from './EventCard';

// Datos de respaldo para producción
const eventosMock = [
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

const isDevelopment = import.meta.env.DEV;

export default function EventList() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        setCargando(true);
        
        if (isDevelopment) {
          // En desarrollo: usar MSW
          console.log('%c API: REST - Cargando eventos con MSW', 'color: #10b981; font-weight: bold; font-size: 12px');
          const response = await fetch('/api/eventos');
          if (!response.ok) {
            throw new Error('Error al cargar eventos');
          }
          const datos = await response.json();
          setEventos(datos);
        } else {
          // En producción: usar datos mock directos
          console.log('%c API: REST - Modo producción (sin MSW)', 'color: #10b981; font-weight: bold; font-size: 12px');
          await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
          setEventos(eventosMock);
        }
        
        console.log('%c API: REST - Datos cargados correctamente', 'color: #10b981; font-weight: bold; font-size: 12px');
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarEventos();
  }, []);

  if (cargando) return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger" role="alert">
      Error: {error}
    </div>
  );

  return (
    <div>
      {/* Badge mostrando API usada */}
      <div className="mb-3" style={{ textAlign: 'center' }}>
        <span style={{
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid #10b981',
          color: '#10b981',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          📡 Datos cargados con: REST API {!isDevelopment && '(Producción)'}
        </span>
      </div>

      <div className="row g-4">
        {eventos.map(evento => (
          <div key={evento.id} className="col-lg-6 col-xl-4">
            <EventCard evento={evento} />
          </div>
        ))}
      </div>
    </div>
  );
}