import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import EventPage from '../pages/EventPage';
import Footer from './Footer';

export default function AppRoutes() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/evento/:id" element={<EventPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
