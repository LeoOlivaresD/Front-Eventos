import EventList from '../components/EventList';

export default function Home() {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
      minHeight: '100vh',
      paddingBottom: '40px'
    }}>
      <header className="text-white py-5 text-center" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
      }}>
        <div className="container">
          <h1 className="display-4 fw-bold mb-2" style={{ letterSpacing: '2px' }}>
            Centro de Eventos
          </h1>
          <p className="lead opacity-90" style={{ fontSize: '1.3rem' }}>
            Descubre los mejores eventos cerca de ti
          </p>
        </div>
      </header>

      <main className="py-5">
        <div className="container">
          <EventList />
        </div>
      </main>
    </div>
  );
}
