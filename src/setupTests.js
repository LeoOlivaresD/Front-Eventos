// src/setupTests.js
import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from './mocks/server'; // <--- Importar el server

// Extiende los matchers
expect.extend(matchers);

// Configuración de MSW para todas las pruebas
beforeAll(() => server.listen({ onUnhandledRequest: 'error' })); // Iniciar servidor
afterEach(() => {
  server.resetHandlers(); // Resetear handlers entre tests
  cleanup();
});
afterAll(() => server.close()); // Cerrar servidor al terminar