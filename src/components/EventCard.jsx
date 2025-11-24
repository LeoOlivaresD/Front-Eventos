import { Link } from 'react-router-dom';

export default function EventCard({ evento }) {
  return (
    <div className="event-card">
      <div className="event-card__header">
        <h3 className="event-card__title">{evento.titulo}</h3>
        <span className="event-card__category">{evento.categoria}</span>
      </div>
      
      <div className="event-card__body">
        <p className="event-card__description">{evento.descripcion}</p>
        
        <div className="event-card__info">
          <p><strong>📅 Fecha:</strong> {evento.fecha}</p>
          <p><strong>📍 Lugar:</strong> {evento.lugar}</p>
          <p><strong>💵 Precio:</strong> ${evento.precio}</p>
        </div>
      </div>

      <div className="event-card__footer">
        <Link to={`/evento/${evento.id}`} className="event-card__link">
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}
