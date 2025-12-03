import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home Page', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza correctamente el título y la estructura', async () => {
    // Mock del fetch para evitar llamadas reales
    global.fetch = vi.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      })
    );

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    // Verifica textos principales definidos en Home.jsx
    expect(screen.getByText(/Centro de Eventos/i)).toBeInTheDocument();
    expect(screen.getByText(/Descubre los mejores eventos/i)).toBeInTheDocument();
    
    // Verifica que intenta cargar el componente hijo EventList
    // (EventList muestra "Cargando..." o el badge de la API)
    await waitFor(() => {
       const main = screen.getByRole('main');
       expect(main).toBeInTheDocument();
    });
  });
});