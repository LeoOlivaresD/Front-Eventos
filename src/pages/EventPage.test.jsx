import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, ApolloLink, Observable } from '@apollo/client';
import EventPage from './EventPage';

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
    vi.stubEnv('DEV', true);
  });

  it('debería mostrar el indicador de carga mientras obtiene datos', () => {
    const mockResponse = {
      data: { evento: eventoMock },
      delay: 1000
    };
    renderEventPage(mockResponse);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('debería renderizar correctamente los detalles del evento', async () => {
    const mockResponse = { data: { evento: eventoMock } };
    renderEventPage(mockResponse);

    await waitFor(() => {
      expect(screen.getByText('Concierto de Rock')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText('Conciertos')).toBeInTheDocument();
    expect(screen.getByText(/\$50/i)).toBeInTheDocument();
  });

  it('debería mostrar error cuando falla la consulta', async () => {
    const mockResponse = { error: new Error('Error al obtener el evento') };
    renderEventPage(mockResponse);

    await waitFor(() => {
      expect(screen.getByText(/Error: Error al obtener el evento/i)).toBeInTheDocument();
    });
  });

  // --- TESTS DE INTERACCIÓN (Cobertura de Lógica) ---

  it('debería manejar el flujo completo del modal: abrir, cambiar cantidad y comprar', async () => {
    const mockResponse = { data: { evento: eventoMock } };
    renderEventPage(mockResponse);

    // Esperar carga
    await waitFor(() => expect(screen.getByText('Concierto de Rock')).toBeInTheDocument());

    // 1. Abrir Modal
    const btnAbrir = screen.getAllByText(/🎟️ Comprar Entrada/i)[0]; // Botón de la página
    fireEvent.click(btnAbrir);
    
    await waitFor(() => {
        expect(screen.getByText('Cantidad de entradas:')).toBeInTheDocument();
    });

    // 2. Verificar precio inicial (1 entrada = $50)
    expect(screen.getByText(/Total: \$50/i)).toBeInTheDocument();

    // 3. Incrementar cantidad (Click en +)
    const btnMas = screen.getByText('+');
    fireEvent.click(btnMas);
    
    // Verificar actualización de input y precio total (2 entradas = $100)
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(2);
    expect(screen.getByText(/Total: \$100/i)).toBeInTheDocument();

    // 4. Confirmar Compra
    const btnConfirmar = screen.getByText(/Confirmar Compra/i);
    fireEvent.click(btnConfirmar);

    // 5. Verificar mensaje de éxito
    await waitFor(() => {
      expect(screen.getByText(/¡Compra exitosa!/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Se ha comprado 2 entradas por \$100/i)).toBeInTheDocument();
  });

  it('debería cerrar el modal al hacer clic en cancelar', async () => {
    const mockResponse = { data: { evento: eventoMock } };
    renderEventPage(mockResponse);

    await waitFor(() => expect(screen.getByText('Concierto de Rock')).toBeInTheDocument());

    // Abrir
    fireEvent.click(screen.getAllByText(/🎟️ Comprar Entrada/i)[0]);
    await waitFor(() => expect(screen.getByText('Cantidad de entradas:')).toBeInTheDocument());

    // Cancelar
    fireEvent.click(screen.getByText(/Cancelar/i));

    // Verificar cierre
    await waitFor(() => {
      expect(screen.queryByText('Cantidad de entradas:')).not.toBeInTheDocument();
    });
  });

  it('debería validar los límites de cantidad (min 1)', async () => {
    const mockResponse = { data: { evento: eventoMock } };
    renderEventPage(mockResponse);

    await waitFor(() => expect(screen.getByText('Concierto de Rock')).toBeInTheDocument());
    fireEvent.click(screen.getAllByText(/🎟️ Comprar Entrada/i)[0]);

    const btnMenos = screen.getByText('−'); // Símbolo matemático usado en tu componente
    const input = screen.getByRole('spinbutton');

    // Intentar bajar de 1
    fireEvent.click(btnMenos);
    expect(input).toHaveValue(1); // No debería cambiar a 0
  });
});