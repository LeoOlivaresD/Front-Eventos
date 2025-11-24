import { useState, useEffect } from 'react';
import { fetchEventosREST } from '../mocks/restAPI';
import EventCard from './EventCard';

export default function EventList() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        setCargando(true);
        const datos = await fetchEventosREST();
        setEventos(datos);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarEventos();
  }, []);

  if (cargando) return <div className="loading">Cargando eventos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="event-list">
      {eventos.map(evento => (
        <EventCard key={evento.id} evento={evento} />
      ))}
    </div>
  );
}
