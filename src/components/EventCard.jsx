import { Link } from 'react-router-dom';

export default function EventCard({ evento }) {
  return (
    <div className="card h-100 shadow-sm border-0 transition-transform" style={{ cursor: 'pointer' }}>
      <div className="card-header bg-gradient text-white">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <h5 className="card-title mb-0 flex-grow-1">{evento.titulo}</h5>
          <span className="badge bg-light text-dark">{evento.categoria}</span>
        </div>
      </div>
      
      <div className="card-body">
        <p className="card-text text-muted">{evento.descripcion}</p>
        
        <div className="event-info">
          <p className="mb-2"><strong>📅 Fecha:</strong> {evento.fecha}</p>
          <p className="mb-2"><strong>📍 Lugar:</strong> {evento.lugar}</p>
          <p className="mb-0"><strong>💵 Precio:</strong> ${evento.precio}</p>
        </div>
      </div>

      <div className="card-footer bg-white border-top">
        <Link to={`/evento/${evento.id}`} className="btn btn-primary btn-sm w-100">
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}
