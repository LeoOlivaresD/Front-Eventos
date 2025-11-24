export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white py-4" style={{
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)',
      borderTop: '1px solid rgba(102, 126, 234, 0.3)',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold mb-3" style={{ color: '#667eea' }}>
              Centro de Eventos
            </h5>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
              Descubre los mejores eventos y experiencias en tu ciudad. Conecta con artistas, conferencistas y comunidades.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="fw-bold mb-3" style={{ color: '#667eea' }}>
              Enlaces Rápidos
            </h5>
            <ul className="list-unstyled">
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s ease' }} 
                   onMouseEnter={(e) => e.target.style.color = '#667eea'}
                   onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>
                  Inicio
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                   onMouseEnter={(e) => e.target.style.color = '#667eea'}
                   onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>
                  Eventos
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                   onMouseEnter={(e) => e.target.style.color = '#667eea'}
                   onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                   onMouseEnter={(e) => e.target.style.color = '#667eea'}
                   onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="fw-bold mb-3" style={{ color: '#667eea' }}>
              Síguenos
            </h5>
            <div className="d-flex gap-3 flex-wrap">
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s ease', fontSize: '0.95rem' }}
                 onMouseEnter={(e) => e.target.style.color = '#667eea'}
                 onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>
                📘 Facebook
              </a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s ease', fontSize: '0.95rem' }}
                 onMouseEnter={(e) => e.target.style.color = '#667eea'}
                 onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>
                📷 Instagram
              </a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s ease', fontSize: '0.95rem' }}
                 onMouseEnter={(e) => e.target.style.color = '#667eea'}
                 onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}>
                𝕏 Twitter
              </a>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0', fontSize: '0.9rem' }}>
              &copy; {currentYear} Centro de Eventos. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-md-end" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
            <small>Desarrollado con Leonardo Olivares</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
