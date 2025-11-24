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
    <div className="row g-4">
      {eventos.map(evento => (
        <div key={evento.id} className="col-lg-6 col-xl-4">
          <EventCard evento={evento} />
        </div>
      ))}
    </div>
  );
}
