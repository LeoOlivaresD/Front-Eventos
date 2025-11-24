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
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{
      background: 'linear-gradient(180deg, #0f0f0f 0%, #1a1a2e 100%)'
    }}>
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-vh-100 py-5" style={{
      background: 'linear-gradient(180deg, #0f0f0f 0%, #1a1a2e 100%)'
    }}>
      <div className="container">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    </div>
  );
  
  if (!evento) return (
    <div className="min-vh-100 py-5" style={{
      background: 'linear-gradient(180deg, #0f0f0f 0%, #1a1a2e 100%)'
    }}>
      <div className="container">
        <div className="alert alert-warning" role="alert">
          Evento no encontrado
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      background: 'linear-gradient(180deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
      minHeight: '100vh',
      paddingTop: '40px',
      paddingBottom: '40px'
    }}>
      <div className="container">
        <Link to="/" className="btn btn-outline-light mb-4" style={{
          borderColor: 'rgba(255,255,255,0.3)',
          color: 'rgba(255,255,255,0.8)',
          transition: 'all 0.3s ease'
        }}>
          ← Volver a Eventos
        </Link>

        <div className="card shadow-lg border-0" style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          borderRadius: '1.5rem'
        }}>
          <div className="card-header bg-gradient text-white py-5" style={{
            borderRadius: '1.5rem 1.5rem 0 0'
          }}>
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div>
                <h1 className="card-title mb-0" style={{ color: '#fff' }}>
                  {evento.titulo}
                </h1>
              </div>
              <span className="badge bg-light text-dark">{evento.categoria}</span>
            </div>
          </div>

          <div className="card-body p-5" style={{ color: '#fff' }}>
            <p className="fs-5 mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {evento.descripcion}
            </p>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="p-3 rounded border-start border-light border-4" style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: '#667eea !important'
                }}>
                  <strong className="d-block mb-2" style={{ color: '#fff' }}>
                    📅 Fecha
                  </strong>
                  <p className="mb-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {evento.fecha}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 rounded border-start border-light border-4" style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: '#667eea !important'
                }}>
                  <strong className="d-block mb-2" style={{ color: '#fff' }}>
                    📍 Lugar
                  </strong>
                  <p className="mb-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {evento.lugar}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 rounded border-start border-light border-4" style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderColor: '#667eea !important'
                }}>
                  <strong className="d-block mb-2" style={{ color: '#fff' }}>
                    💵 Precio
                  </strong>
                  <p className="mb-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    ${evento.precio}
                  </p>
                </div>
              </div>
              {evento.artista && (
                <div className="col-md-6">
                  <div className="p-3 rounded border-start border-light border-4" style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: '#667eea !important'
                  }}>
                    <strong className="d-block mb-2" style={{ color: '#fff' }}>
                      🎤 Artista
                    </strong>
                    <p className="mb-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {evento.artista}
                    </p>
                  </div>
                </div>
              )}
              {evento.ponente && (
                <div className="col-md-6">
                  <div className="p-3 rounded border-start border-light border-4" style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: '#667eea !important'
                  }}>
                    <strong className="d-block mb-2" style={{ color: '#fff' }}>
                      👤 Ponente
                    </strong>
                    <p className="mb-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {evento.ponente}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button className="btn btn-primary btn-lg w-100" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              marginTop: '2rem',
              fontWeight: '700',
              letterSpacing: '0.5px'
            }}>
              Comprar Entrada
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
