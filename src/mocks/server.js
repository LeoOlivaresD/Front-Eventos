// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Configura el servidor de peticiones con los mismos handlers que usas en el navegador
export const server = setupServer(...handlers);