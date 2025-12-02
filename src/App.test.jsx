import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './pages/Home';

describe('App Component - Test de Configuración', () => {
  it('debería renderizar la página Home correctamente', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    // Verificar que el título principal esté presente
    expect(screen.getByText(/Centro de Eventos/i)).toBeInTheDocument();
  });
});