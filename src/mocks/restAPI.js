export const fetchEventosREST = async () => {
  console.log('%cREST API: Pidiendo eventos a /api/eventos', 'color: #10b981; font-weight: bold; font-size: 12px');
  const response = await fetch('/api/eventos');
  const datos = await response.json();
  return datos;
};

export const fetchEventoByIdREST = async (id) => {
  console.log('%cREST API: Pidiendo evento con ID ' + id, 'color: #10b981; font-weight: bold; font-size: 12px');
  const response = await fetch(`/api/evento/${id}`);
  if (!response.ok) throw new Error('Evento no encontrado');
  return response.json();
};
