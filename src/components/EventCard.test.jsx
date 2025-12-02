import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EventCard from './EventCard';
import { fireEvent } from '@testing-library/react';
// Mock de datos de prueba
const eventoMock = {
  id: 1,
  titulo: "Concierto de Rock",
  categoria: "Conciertos",
  fecha: "2025-12-15",
  lugar: "Estadio Nacional",
  descripcion: "Un increíble concierto de rock en vivo",
  precio: 50,
  imagen: "/images/concierto-rock.jpg"
};

describe('EventCard Component', () => {
  it('debería renderizar correctamente con todos los datos del evento', () => {
    render(
      <MemoryRouter>
        <EventCard evento={eventoMock} />
      </MemoryRouter>
    );

    // Verificar que el título está presente
    expect(screen.getByText('Concierto de Rock')).toBeInTheDocument();
    
    // Verificar que la categoría está presente
    expect(screen.getByText('Conciertos')).toBeInTheDocument();
    
    // Verificar que la descripción está presente
    expect(screen.getByText(/Un increíble concierto de rock en vivo/i)).toBeInTheDocument();
    
    // Verificar que la fecha está presente
    expect(screen.getByText(/2025-12-15/i)).toBeInTheDocument();
    
    // Verificar que el lugar está presente
    expect(screen.getByText(/Estadio Nacional/i)).toBeInTheDocument();
    
    // Verificar que el precio está presente
    expect(screen.getByText(/\$50/i)).toBeInTheDocument();
  });

  it('debería mostrar el botón "Ver Detalles"', () => {
    render(
      <MemoryRouter>
        <EventCard evento={eventoMock} />
      </MemoryRouter>
    );

    const boton = screen.getByText(/Ver Detalles/i);
    expect(boton).toBeInTheDocument();
  });

  it('debería tener un link correcto hacia la página de detalles', () => {
    render(
      <MemoryRouter>
        <EventCard evento={eventoMock} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /Ver Detalles/i });
    expect(link).toHaveAttribute('href', '/evento/1');
  });

  it('debería renderizar correctamente sin imagen', () => {
    const eventoSinImagen = { ...eventoMock, imagen: null };
    
    render(
      <MemoryRouter>
        <EventCard evento={eventoSinImagen} />
      </MemoryRouter>
    );

    // Verificar que el título sigue presente
    expect(screen.getByText('Concierto de Rock')).toBeInTheDocument();
  });
});
it('debería manejar los eventos del mouse en la imagen', () => {
  render(
    <MemoryRouter>
      <EventCard evento={eventoMock} />
    </MemoryRouter>
  );

  const img = screen.getByAltText('Concierto de Rock');
  
  // Simular hover (Mouse Enter)
  fireEvent.mouseEnter(img);
  expect(img).toHaveStyle('transform: scale(1.1)'); // Verifica el estilo inline

  // Simular salida (Mouse Leave)
  fireEvent.mouseLeave(img);
  expect(img).toHaveStyle('transform: scale(1)');
});

it('debería manejar error de carga de imagen', () => {
  render(
    <MemoryRouter>
      <EventCard evento={eventoMock} />
    </MemoryRouter>
  );

  const img = screen.getByAltText('Concierto de Rock');
  // El div placeholder es el hermano siguiente
  // Nota: en tu código el placeholder tiene el estilo inicial display: none
  
  fireEvent.error(img);
  
  // Al dar error, la imagen se oculta (display: none)
  expect(img).toHaveStyle('display: none');
});