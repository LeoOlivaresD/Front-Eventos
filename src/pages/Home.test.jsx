import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home Component', () => {
  it('debería renderizar el header con el título principal', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Centro de Eventos')).toBeInTheDocument();
  });

  it('debería mostrar el subtítulo descriptivo', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/Descubre los mejores eventos cerca de ti/i)).toBeInTheDocument();
  });

  it('debería renderizar el componente EventList', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verificar que EventList se renderiza (mostrará el indicador de carga o eventos)
    await waitFor(() => {
      const loadingOrContent = screen.queryByRole('status') || screen.queryByText(/Ver Detalles/i);
      expect(loadingOrContent).toBeTruthy();
    });
  });

  it('debería tener la estructura correcta con header y main', () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const header = container.querySelector('header');
    const main = container.querySelector('main');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });
});