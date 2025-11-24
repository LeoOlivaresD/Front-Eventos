import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import EventPage from '../pages/EventPage';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evento/:id" element={<EventPage />} />
      </Routes>
    </Router>
  );
}
