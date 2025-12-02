import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, ApolloLink, Observable } from '@apollo/client';
import EventPage from './EventPage';
import { gql } from '@apollo/client';

// Mock de datos de prueba
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

// Helper para crear un cliente Apollo mock
const createMockApolloClient = (mockResponse) => {
  const mockLink = new ApolloLink((operation) => {
    return new Observable((observer) => {
      if (mockResponse.error) {
        observer.error(mockResponse.error);
      } else {
        setTimeout(() => {
          observer.next(mockResponse);
          observer.complete();
        }, mockResponse.delay || 0);
      }
    });
  });

  return new ApolloClient({
    link: mockLink,
    cache: new InMemoryCache(),
  });
};

// Helper para renderizar con router y Apollo
const renderEventPage = (mockResponse, initialRoute = '/evento/1') => {
  const client = createMockApolloClient(mockResponse);
  
  return render(
    <ApolloProvider client={client}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/evento/:id" element={<EventPage />} />
        </Routes>
      </MemoryRouter>
    </ApolloProvider>
  );
};

describe('EventPage Component', () => {
  beforeEach(() => {
    // Asegurar que estamos en modo desarrollo para las pruebas
    vi.stubEnv('DEV', true);
  });

  it('debería mostrar el indicador de carga mientras obtiene datos', () => {
    const mockResponse = {
      data: { evento: eventoMock },
      delay: 1000 // Delay largo para mantener el estado de carga
    };

    renderEventPage(mockResponse);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });

  it('debería renderizar correctamente los detalles del evento', async () => {
    const mockResponse = {
      data: { evento: eventoMock }
    };

    renderEventPage(mockResponse);

    await waitFor(() => {
      expect(screen.getByText('Concierto de Rock')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText('Conciertos')).toBeInTheDocument();
    expect(screen.getByText(/Un increíble concierto de rock en vivo/i)).toBeInTheDocument();
    expect(screen.getByText(/2025-12-15/i)).toBeInTheDocument();
    expect(screen.getByText(/Estadio Nacional/i)).toBeInTheDocument();
    expect(screen.getByText(/\$50/i)).toBeInTheDocument();
    expect(screen.getByText(/The Rockers/i)).toBeInTheDocument();
  });

  it('debería mostrar el botón "Volver a Eventos"', async () => {
    const mockResponse = {
      data: { evento: eventoMock }
    };

    renderEventPage(mockResponse);

    await waitFor(() => {
      expect(screen.getByText(/Volver a Eventos/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    const backButton = screen.getByText(/Volver a Eventos/i);
    expect(backButton.closest('a')).toHaveAttribute('href', expect.stringContaining('/'));
  });

  it('debería mostrar el badge de GraphQL + Apollo Client', async () => {
    const mockResponse = {
      data: { evento: eventoMock }
    };

    renderEventPage(mockResponse);

    await waitFor(() => {
      expect(screen.getByText(/Evento cargado con: GraphQL \+ Apollo Client/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('debería mostrar el botón "Comprar Entrada"', async () => {
    const mockResponse = {
      data: { evento: eventoMock }
    };

    renderEventPage(mockResponse);

    await waitFor(() => {
      const buttons = screen.getAllByText(/🎟️ Comprar Entrada/i);
      expect(buttons.length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });

  it('debería abrir el modal al hacer clic en "Comprar Entrada"', async () => {
    const mockResponse = {
      data: { evento: eventoMock }
    };

    renderEventPage(mockResponse);

    await waitFor(() => {
      expect(screen.getByText('Concierto de Rock')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Buscar el botón principal de compra (no el del modal)
    const buttons = screen.getAllByText(/🎟️ Comprar Entrada/i);
    const comprarButton = buttons[0]; // El primer botón es el de la página principal
    
    fireEvent.click(comprarButton);

    // Verificar que el modal se abre buscando elementos únicos del modal
    await waitFor(() => {
      expect(screen.getByText(/Cantidad de entradas:/i)).toBeInTheDocument();
    });
  });

  it('debería permitir cambiar la cantidad de entradas en el modal', async () => {
    const mockResponse = {
      data: { evento: eventoMock }
    };

    renderEventPage(mockResponse);

    await waitFor(() => {
      expect(screen.getByText('Concierto de Rock')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Abrir modal
    const buttons = screen.getAllByText(/🎟️ Comprar Entrada/i);
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });

    // Cambiar cantidad
    const cantidadInput = screen.getByRole('spinbutton');
    fireEvent.change(cantidadInput, { target: { value: '3' } });

    expect(cantidadInput.value).toBe('3');
  });

  it('debería calcular correctamente el precio total', async () => {
    const mockResponse = {
      data: { evento: eventoMock }
    };

    renderEventPage(mockResponse);

    await waitFor(() => {
      expect(screen.getByText('Concierto de Rock')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Abrir modal
    const buttons = screen.getAllByText(/🎟️ Comprar Entrada/i);
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(screen.getByText(/Total: \$50/i)).toBeInTheDocument();
    });

    // Cambiar cantidad a 2
    const cantidadInput = screen.getByRole('spinbutton');
    fireEvent.change(cantidadInput, { target: { value: '2' } });

    await waitFor(() => {
      expect(screen.getByText(/Total: \$100/i)).toBeInTheDocument();
    });
  });

  it('debería mostrar mensaje de error cuando falla la consulta', async () => {
    const mockResponse = {
      error: new Error('Error al obtener el evento')
    };

    renderEventPage(mockResponse);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Error: Error al obtener el evento/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('debería mostrar el ponente cuando el evento es una conferencia', async () => {
    const eventoConferencia = {
      ...eventoMock,
      id: 2,
      titulo: "Conferencia de Tecnología",
      categoria: "Conferencias",
      artista: null,
      ponente: "Dr. Juan Silva"
    };

    const mockResponse = {
      data: { evento: eventoConferencia }
    };

    renderEventPage(mockResponse, '/evento/2');

    await waitFor(() => {
      expect(screen.getByText(/Dr. Juan Silva/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('debería cerrar el modal al hacer clic en Cancelar', async () => {
    const mockResponse = {
      data: { evento: eventoMock }
    };

    renderEventPage(mockResponse);

    await waitFor(() => {
      expect(screen.getByText('Concierto de Rock')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Abrir modal
    const buttons = screen.getAllByText(/🎟️ Comprar Entrada/i);
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(screen.getByText(/Cantidad de entradas:/i)).toBeInTheDocument();
    });

    // Hacer clic en Cancelar
    const cancelarButton = screen.getByText(/Cancelar/i);
    fireEvent.click(cancelarButton);

    // El modal debería cerrarse (el texto único del modal desaparece)
    await waitFor(() => {
      expect(screen.queryByText(/Cantidad de entradas:/i)).not.toBeInTheDocument();
    });
  });
});