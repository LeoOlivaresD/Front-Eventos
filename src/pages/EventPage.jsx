import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { queryEventoByIdGraphQL } from '../mocks/graphqlAPI';

export default function EventPage() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [apiUsada, setApiUsada] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [compraExitosa, setCompraExitosa] = useState(false);

  useEffect(() => {
    const cargarEvento = async () => {
      try {
        setCargando(true);
        console.log('%c📡 API: GraphQL - Cargando evento ID ' + id + ' desde graphqlAPI.js', 'color: #f59e0b; font-weight: bold; font-size: 12px');
        const datos = await queryEventoByIdGraphQL(id);
        console.log('%c✅ API: GraphQL - Evento recibido correctamente', 'color: #f59e0b; font-weight: bold; font-size: 12px', datos);
        setEvento(datos);
        setApiUsada('GraphQL');
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarEvento();
  }, [id]);

  const handleComprar = () => {
    setCompraExitosa(true);
    setTimeout(() => {
      setMostrarModal(false);
      setCompraExitosa(false);
      setCantidad(1);
    }, 2000);
  };

  const totalPrecio = evento ? evento.precio * cantidad : 0;

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

        {/* Badge mostrando API usada */}
        <div className="mb-3" style={{ textAlign: 'center' }}>
          <span style={{
            background: 'rgba(245, 158, 11, 0.2)',
            border: '1px solid #f59e0b',
            color: '#f59e0b',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            📡 Evento cargado con: {apiUsada}
          </span>
        </div>

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

            <button 
              onClick={() => setMostrarModal(true)}
              className="btn btn-primary btn-lg w-100" 
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                marginTop: '2rem',
                fontWeight: '700',
                letterSpacing: '0.5px'
              }}
            >
              🎫 Comprar Entrada
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            {!compraExitosa ? (
              <>
                <h2 style={{ color: '#fff', marginBottom: '24px', textAlign: 'center' }}>
                  🎫 Comprar Entrada
                </h2>

                <div style={{ marginBottom: '24px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                    Evento:
                  </p>
                  <p style={{ color: '#fff', fontWeight: 'bold', margin: 0 }}>
                    {evento.titulo}
                  </p>
                </div>

                <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                    Cantidad de entradas:
                  </label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                      style={{
                        background: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '18px'
                      }}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={cantidad}
                      onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        flex: 1,
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}
                      min="1"
                      max="10"
                    />
                    <button
                      onClick={() => setCantidad(Math.min(10, cantidad + 1))}
                      style={{
                        background: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '18px'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', border: '1px solid rgba(102, 126, 234, 0.3)' }}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '0 0 8px 0' }}>
                    Precio por entrada:
                  </p>
                  <p style={{ color: '#667eea', fontWeight: 'bold', fontSize: '18px', margin: 0 }}>
                    ${evento.precio}
                  </p>
                  <hr style={{ borderColor: 'rgba(102, 126, 234, 0.2)', margin: '12px 0' }} />
                  <p style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
                    Total: ${totalPrecio}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setMostrarModal(false)}
                    style={{
                      background: 'transparent',
                      color: '#667eea',
                      border: '1px solid #667eea',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      flex: 1,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#667eea';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#667eea';
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleComprar}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      flex: 1,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    Confirmar Compra
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                  ✅
                </div>
                <h2 style={{ color: '#10b981', marginBottom: '16px' }}>
                  ¡Compra exitosa!
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
                  Se ha comprado {cantidad} entrada{cantidad > 1 ? 's' : ''} por ${totalPrecio}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                  Redirigiendo...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
