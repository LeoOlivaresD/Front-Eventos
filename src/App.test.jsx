import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('debería renderizar sin errores', () => {
    render(<App />);
    expect(screen.getByText(/Centro de Eventos/i)).toBeInTheDocument();
  });
});