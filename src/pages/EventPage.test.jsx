import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import EventPage from './EventPage';
import { gql } from '@apollo/client';

// Query GraphQL que usa el componente
const GET_EVENTO = gql`
  query GetEventoById($id: Int!) {
    evento(id: $id) {
      id
      titulo
      categoria
      fecha
      lugar
      descripcion
      artista
      ponente
      precio
      imagen
    }
  }
`;

// Mock de datos del evento
const eventoMock = {
  id: 1,
  titulo: "Concierto de Rock",
  categoria: "Conciertos",
  fecha: "2025-12-15",
  lugar: "Estadio Nacional",
  descripcion: "Un increíble concierto de rock en vivo",
  artista: "The Rockers",
  ponente: null,
  precio: 50,
  imagen: "/images/concierto-rock.jpg"
};

// Función helper para renderizar el componente con todas las dependencias
const renderEventPage = (mocks = []) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/evento/1']}>
        <Routes>
          <Route path="/evento/:id" element={<EventPage />} />
        </Routes>
      </MemoryRouter>
    </MockedProvider>
  );
};

describe('EventPage Component', () => {
  it('debería mostrar el indicador de carga inicialmente', () => {
    const mocks = [
      {
        request: {
          query: GET_EVENTO,
          variables: { id: 1 },
        },
        result: {
          data: { evento: eventoMock },
        },
        delay: 1000, // Delay para mantener el estado de carga
      },
    ];

    renderEventPage(mocks);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });

  it('debería renderizar los detalles del evento correctamente', async () => {
    const mocks = [
      {
        request: {
          query: GET_EVENTO,
          variables: { id: 1 },
        },
        result: {
          data: { evento: eventoMock },
        },
      },
    ];

    renderEventPage(mocks);

    await waitFor(() => {
      expect(screen.getByText('Concierto de Rock')).toBeInTheDocument();
    });

    expect(screen.getByText(/Un increíble concierto de rock en vivo/i)).toBeInTheDocument();
    expect(screen.getByText(/2025-12-15/i)).toBeInTheDocument();
    expect(screen.getByText(/Estadio Nacional/i)).toBeInTheDocument();
    expect(screen.getByText(/\$50/i)).toBeInTheDocument();
    expect(screen.getByText(/The Rockers/i)).toBeInTheDocument();
  });

  it('debería mostrar el badge de GraphQL + Apollo Client', async () => {
    const mocks = [
      {
        request: {
          query: GET_EVENTO,
          variables: { id: 1 },
        },
        result: {
          data: { evento: eventoMock },
        },
      },
    ];

    renderEventPage(mocks);

    await waitFor(() => {
      expect(screen.getByText(/Evento cargado con: GraphQL \+ Apollo Client/i)).toBeInTheDocument();
    });
  });

  it('debería mostrar el botón "Comprar Entrada"', async () => {
    const mocks = [
      {
        request: {
          query: GET_EVENTO,
          variables: { id: 1 },
        },
        result: {
          data: { evento: eventoMock },
        },
      },
    ];

    renderEventPage(mocks);

    await waitFor(() => {
      expect(screen.getByText(/🎟️ Comprar Entrada/i)).toBeInTheDocument();
    });
  });

  it('debería abrir el modal al hacer clic en "Comprar Entrada"', async () => {
    const mocks = [
      {
        request: {
          query: GET_EVENTO,
          variables: { id: 1 },
        },
        result: {
          data: { evento: eventoMock },
        },
      },
    ];

    renderEventPage(mocks);

    await waitFor(() => {
      expect(screen.getByText(/🎟️ Comprar Entrada/i)).toBeInTheDocument();
    });

    const botonComprar = screen.getByText(/🎟️ Comprar Entrada/i);
    fireEvent.click(botonComprar);

    // Verificar que el modal se abre
    await waitFor(() => {
      expect(screen.getByText(/Cantidad de entradas:/i)).toBeInTheDocument();
    });
  });

  it('debería mostrar mensaje de error cuando falla la consulta GraphQL', async () => {
    const mocks = [
      {
        request: {
          query: GET_EVENTO,
          variables: { id: 1 },
        },
        error: new Error('Error al cargar el evento'),
      },
    ];

    renderEventPage(mocks);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });

  it('debería mostrar mensaje cuando el evento no existe', async () => {
    const mocks = [
      {
        request: {
          query: GET_EVENTO,
          variables: { id: 999 },
        },
        result: {
          data: { evento: null },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/evento/999']}>
          <Routes>
            <Route path="/evento/:id" element={<EventPage />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Evento no encontrado/i)).toBeInTheDocument();
    });
  });

  it('debería mostrar el botón "Volver a Eventos"', async () => {
    const mocks = [
      {
        request: {
          query: GET_EVENTO,
          variables: { id: 1 },
        },
        result: {
          data: { evento: eventoMock },
        },
      },
    ];

    renderEventPage(mocks);

    await waitFor(() => {
      expect(screen.getByText(/← Volver a Eventos/i)).toBeInTheDocument();
    });
  });
});