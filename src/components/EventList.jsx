import { useState, useEffect } from 'react';
import { fetchEventosREST } from '../mocks/restAPI';
import EventCard from './EventCard';

export default function EventList() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [apiUsada, setApiUsada] = useState('');

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        setCargando(true);
        console.log('%c API: REST - Cargando eventos desde restAPI.js', 'color: #10b981; font-weight: bold; font-size: 12px');
        const datos = await fetchEventosREST();
        console.log('%c API: REST - Datos recibidos correctamente', 'color: #10b981; font-weight: bold; font-size: 12px', datos);
        setEventos(datos);
        setApiUsada('REST API');
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
           Datos cargados con: {apiUsada}
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
