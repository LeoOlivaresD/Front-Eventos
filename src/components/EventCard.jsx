import { Link } from 'react-router-dom';

export default function EventCard({ evento }) {
  return (
    <div className="card h-100 shadow-sm border-0 transition-transform overflow-hidden">
      {/* Imagen */}
      <div className="position-relative overflow-hidden" style={{ height: '200px', background: '#f0f0f0' }}>
        {evento.imagen ? (
          <img 
            src={evento.imagen} 
            alt={evento.titulo}
            className="w-100 h-100"
            style={{ 
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              display: 'block'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        ) : null}
        
        {/* Placeholder si la imagen no carga */}
        <div 
          className="w-100 h-100 d-flex align-items-center justify-content-center bg-gradient text-white fw-bold"
          style={{ display: evento.imagen ? 'none' : 'flex' }}
        >
          {evento.titulo.substring(0, 1)}
        </div>

        <div className="position-absolute top-0 end-0 p-2">
          <span className="badge bg-light text-dark">{evento.categoria}</span>
        </div>
      </div>

      {/* Header con título */}
      <div className="card-header bg-gradient text-white">
        <h5 className="card-title mb-0">{evento.titulo}</h5>
      </div>
      
      {/* Body */}
      <div className="card-body">
        <p className="card-text text-muted mb-3">{evento.descripcion}</p>
        
        <div className="event-info">
          <p className="mb-2"><strong>📅 Fecha:</strong> <br/> {evento.fecha}</p>
          <p className="mb-2"><strong>📍 Lugar:</strong> <br/> {evento.lugar}</p>
          <p className="mb-0"><strong>💵 Precio:</strong> <br/> ${evento.precio}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer bg-white border-top">
        <Link to={`/evento/${evento.id}`} className="btn btn-primary btn-sm w-100">
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';

export default function EventCard({ evento }) {
  return (
    <div className="card h-100 shadow-sm border-0 transition-transform overflow-hidden">
      {/* Imagen */}
      <div className="position-relative overflow-hidden" style={{ height: '200px', background: '#f0f0f0' }}>
        {evento.imagen ? (
          <img 
            src={evento.imagen} 
            alt={evento.titulo}
            className="w-100 h-100"
            style={{ 
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              display: 'block'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        ) : null}
        
        {/* Placeholder si la imagen no carga */}
        <div 
          className="w-100 h-100 d-flex align-items-center justify-content-center bg-gradient text-white fw-bold"
          style={{ display: evento.imagen ? 'none' : 'flex' }}
        >
          {evento.titulo.substring(0, 1)}
        </div>

        <div className="position-absolute top-0 end-0 p-2">
          <span className="badge bg-light text-dark">{evento.categoria}</span>
        </div>
      </div>

      {/* Header con título */}
      <div className="card-header bg-gradient text-white">
        <h5 className="card-title mb-0">{evento.titulo}</h5>
      </div>
      
      {/* Body */}
      <div className="card-body">
        <p className="card-text text-muted mb-3">{evento.descripcion}</p>
        
        <div className="event-info">
          <p className="mb-2"><strong>📅 Fecha:</strong> <br/> {evento.fecha}</p>
          <p className="mb-2"><strong>📍 Lugar:</strong> <br/> {evento.lugar}</p>
          <p className="mb-0"><strong>💵 Precio:</strong> <br/> ${evento.precio}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer bg-white border-top">
        <Link to={`/evento/${evento.id}`} className="btn btn-primary btn-sm w-100">
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}
