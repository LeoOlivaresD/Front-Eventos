import EventList from '../components/EventList';

export default function Home() {
  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">🎭 Centro de Eventos</h1>
        <p className="home__subtitle">Descubre los mejores eventos cerca de ti</p>
      </header>

      <main className="home__main">
        <EventList />
      </main>
    </div>
  );
}
