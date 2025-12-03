import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('Home Component', () => {
  it('debería renderizar el título y pasar los datos a EventList', async () => {
    // Sobrescribimos la respuesta del servidor MSW para este test específico
    // Esto evita el conflicto con el mock manual de fetch y asegura que recibamos los datos esperados
    server.use(
      http.get('/api/eventos', () => {
        return HttpResponse.json([
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
        ]);
      })
    );

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // 1. Verificamos elementos estáticos del Home (Header)
    expect(screen.getByText('Centro de Eventos')).toBeInTheDocument();
    expect(screen.getByText(/Descubre los mejores eventos/i)).toBeInTheDocument();

    // 2. Verificamos que los datos mockeados llegaron correctamente al hijo (EventList)
    await waitFor(() => {
      expect(screen.getByText('Evento Test')).toBeInTheDocument();
    });
  });
});