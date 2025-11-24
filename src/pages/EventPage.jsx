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

  if (cargando) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger m-4" role="alert">
      Error: {error}
    </div>
  );
  
  if (!evento) return (
    <div className="alert alert-warning m-4" role="alert">
      Evento no encontrado
    </div>
  );

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <Link to="/" className="btn btn-outline-primary mb-4">
          ← Volver a Eventos
        </Link>

        <div className="card shadow-lg border-0">
          <div className="card-header bg-gradient text-white py-5">
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div>
                <h1 className="card-title mb-0">{evento.titulo}</h1>
              </div>
              <span className="badge bg-light text-dark">{evento.categoria}</span>
            </div>
          </div>

          <div className="card-body p-5">
            <p className="fs-5 text-muted mb-4">{evento.descripcion}</p>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="p-3 bg-light rounded border-start border-primary border-4">
                  <strong className="d-block mb-2">📅 Fecha</strong>
                  <p className="mb-0 text-muted">{evento.fecha}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded border-start border-primary border-4">
                  <strong className="d-block mb-2">📍 Lugar</strong>
                  <p className="mb-0 text-muted">{evento.lugar}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded border-start border-primary border-4">
                  <strong className="d-block mb-2">💵 Precio</strong>
                  <p className="mb-0 text-muted">${evento.precio}</p>
                </div>
              </div>
              {evento.artista && (
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded border-start border-primary border-4">
                    <strong className="d-block mb-2">🎤 Artista</strong>
                    <p className="mb-0 text-muted">{evento.artista}</p>
                  </div>
                </div>
              )}
              {evento.ponente && (
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded border-start border-primary border-4">
                    <strong className="d-block mb-2">👤 Ponente</strong>
                    <p className="mb-0 text-muted">{evento.ponente}</p>
                  </div>
                </div>
              )}
            </div>

            <button className="btn btn-primary btn-lg w-100">
              Comprar Entrada
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
