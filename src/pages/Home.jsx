import EventList from '../components/EventList';

export default function Home() {
  return (
    <div className="bg-gradient min-vh-100">
      <header className="bg-gradient text-white py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-2">🎭 Centro de Eventos</h1>
          <p className="lead opacity-90">Descubre los mejores eventos cerca de ti</p>
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
