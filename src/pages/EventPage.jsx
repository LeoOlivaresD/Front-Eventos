import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { queryEventoByIdGraphQL } from '../mocks/graphqlAPI';

export default function EventPage() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEvento = async () => {
      try {
        setCargando(true);
        const datos = await queryEventoByIdGraphQL(id);
        setEvento(datos);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarEvento();
  }, [id]);

  if (cargando) return <div className="loading">Cargando detalles...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!evento) return <div className="error">Evento no encontrado</div>;

  return (
    <div className="event-page">
      <Link to="/" className="event-page__back">
        ← Volver a Eventos
      </Link>

      <div className="event-page__container">
        <div className="event-page__header">
          <h1 className="event-page__title">{evento.titulo}</h1>
          <span className="event-page__category">{evento.categoria}</span>
        </div>

        <div className="event-page__content">
          <p className="event-page__description">{evento.descripcion}</p>

          <div className="event-page__details">
            <div className="event-page__detail">
              <strong>📅 Fecha:</strong>
              <p>{evento.fecha}</p>
            </div>
            <div className="event-page__detail">
              <strong>📍 Lugar:</strong>
              <p>{evento.lugar}</p>
            </div>
            <div className="event-page__detail">
              <strong>💵 Precio:</strong>
              <p>${evento.precio}</p>
            </div>
            {evento.artista && (
              <div className="event-page__detail">
                <strong>🎤 Artista:</strong>
                <p>{evento.artista}</p>
              </div>
            )}
            {evento.ponente && (
              <div className="event-page__detail">
                <strong>👤 Ponente:</strong>
                <p>{evento.ponente}</p>
              </div>
            )}
          </div>

          <button className="event-page__button">Comprar Entrada</button>
        </div>
      </div>
    </div>
  );
}
