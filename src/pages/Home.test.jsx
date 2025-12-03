import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mock de fetch para evitar llamadas reales
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        {
          id: 1,
          titulo: "Evento Test",
          categoria: "Test",
          fecha: "2025-12-15",
          lugar: "Test Lugar",
          descripcion: "Descripción test",
          precio: 50,
          imagen: "/test.jpg"
        }
      ]),
    })
  );
});

describe('Home Component', () => {
  it('debería renderizar el componente Home correctamente', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verificar que el componente se renderiza
    await waitFor(() => {
      expect(screen.getByText(/Centro de Eventos/i)).toBeInTheDocument();
    });
  });

  it('debería mostrar el título principal del header', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      const titulo = screen.getByText('Centro de Eventos');
      expect(titulo).toBeInTheDocument();
    });
  });

  it('debería mostrar el subtítulo descriptivo', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      const subtitulo = screen.getByText(/Descubre los mejores eventos cerca de ti/i);
      expect(subtitulo).toBeInTheDocument();
    });
  });

  it('debería renderizar el header con estilos correctos', async () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
      expect(header.classList.contains('text-white')).toBe(true);
    });
  });

  it('debería renderizar el componente main', async () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });
  });
});