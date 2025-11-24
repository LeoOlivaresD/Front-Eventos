export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-gradient text-white mt-5 py-4">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold mb-3">🎭 Centro de Eventos</h5>
            <p className="text-white-50">
              Descubre los mejores eventos y experiencias en tu ciudad. Conecta con artistas, conferencistas y comunidades.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="fw-bold mb-3">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50 text-decoration-none">Inicio</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none">Eventos</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none">Contacto</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className="fw-bold mb-3">Síguenos</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-white-50 text-decoration-none" title="Facebook">
                <i className="bi bi-facebook"></i> Facebook
              </a>
              <a href="#" className="text-white-50 text-decoration-none" title="Instagram">
                <i className="bi bi-instagram"></i> Instagram
              </a>
              <a href="#" className="text-white-50 text-decoration-none" title="Twitter">
                <i className="bi bi-twitter"></i> Twitter
              </a>
            </div>
          </div>
        </div>

        <hr className="border-white-50" />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-white-50 mb-0">
              &copy; {currentYear} Centro de Eventos. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-md-end text-white-50">
            <small>Desarrollado con <span style={{ color: '#ff6b6b' }}>❤️</span> por tu equipo</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
