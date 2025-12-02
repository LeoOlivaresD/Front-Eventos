import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EventList from './EventList';

// Mock de datos para las pruebas
const eventosMock = [
  {
    id: 1,
    titulo: "Concierto de Rock",
    categoria: "Conciertos",
    fecha: "2025-12-15",
    lugar: "Estadio Nacional",
    descripcion: "Un increíble concierto de rock",
    precio: 50,
    imagen: "/images/concierto-rock.jpg"
  },
  {
    id: 2,
    titulo: "Conferencia de Tecnología",
    categoria: "Conferencias",
    fecha: "2025-12-20",
    lugar: "Centro de Convenciones",
    descripcion: "Últimas tendencias en tecnología",
    precio: 30,
    imagen: "/images/conferencia-tech.jpeg"
  }
];

describe('EventList Component', () => {
  // Mock de fetch para simular respuestas de API
  let fetchMock;

  beforeAll(() => {
    // Guardar el fetch original
    fetchMock = global.fetch;
  });

  afterEach(() => {
    // Restaurar fetch después de cada test
    global.fetch = fetchMock;
    vi.clearAllMocks();
  });

  afterAll(() => {
    // Limpiar al final
    global.fetch = fetchMock;
  });

  it('debería mostrar el indicador de carga inicialmente', () => {
    // Mock fetch que nunca se resuelve para mantener el estado de carga
    global.fetch = vi.fn(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <EventList />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });

  it('debería renderizar la lista de eventos correctamente', async () => {
    // Mock fetch exitoso
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(eventosMock),
      })
    );

    render(
      <MemoryRouter>
        <EventList />
      </MemoryRouter>
    );

    // Esperar a que se carguen los eventos
    await waitFor(() => {
      expect(screen.getByText('Concierto de Rock')).toBeInTheDocument();
    });

    expect(screen.getByText('Conferencia de Tecnología')).toBeInTheDocument();
  });

  it('debería mostrar el badge indicando que usa REST API', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(eventosMock),
      })
    );

    render(
      <MemoryRouter>
        <EventList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Datos cargados con: REST API/i)).toBeInTheDocument();
    });
  });

  it('debería mostrar mensaje de error cuando falla la petición', async () => {
    // Mock fetch que falla
    global.fetch = vi.fn(() =>
      Promise.reject(new Error('Error al cargar eventos'))
    );

    render(
      <MemoryRouter>
        <EventList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Error: Error al cargar eventos/i)).toBeInTheDocument();
    });
  });

  it('debería renderizar múltiples EventCards', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(eventosMock),
      })
    );

    render(
      <MemoryRouter>
        <EventList />
      </MemoryRouter>
    );

    await waitFor(() => {
      const eventCards = screen.getAllByText(/Ver Detalles/i);
      expect(eventCards).toHaveLength(2);
    });
  });
});