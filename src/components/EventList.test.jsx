import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('EventList Component', () => {
  let fetchMock;

  beforeAll(() => {
    fetchMock = global.fetch;
  });

  afterEach(() => {
    global.fetch = fetchMock;
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('debería renderizar la lista de eventos en modo Desarrollo', async () => {
    vi.stubEnv('DEV', true);
    const EventList = (await import('./EventList')).default;
    
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: 1, titulo: "Evento Test", categoria: "Test", fecha: "2025", precio: 100, imagen: "test.jpg" }
        ]),
      })
    );

    render(
      <MemoryRouter>
        <EventList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Evento Test')).toBeInTheDocument();
      expect(screen.getByText(/REST API/i)).toBeInTheDocument();
    });
  });

  it('debería mostrar error si la API falla', async () => {
    vi.stubEnv('DEV', true);
    const EventList = (await import('./EventList')).default;

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500
      })
    );

    render(
      <MemoryRouter>
        <EventList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });

  it('debería cargar datos de respaldo en modo Producción', async () => {
    vi.stubEnv('DEV', false);
    const EventList = (await import('./EventList')).default;

    render(
      <MemoryRouter>
        <EventList />
      </MemoryRouter>
    );

    await waitFor(() => {
      // CORRECCIÓN AQUÍ: Usamos getByRole para buscar especificamente el título h5
      expect(screen.getByRole('heading', { name: /Concierto de Rock/i })).toBeInTheDocument();
      
      expect(screen.getByText(/Producción/i)).toBeInTheDocument();
    });
  });
});