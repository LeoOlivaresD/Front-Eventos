export const fetchEventosREST = async () => {
  console.log('%c REST API: Pidiendo eventos a http://api.local/eventos', 'color: #10b981; font-weight: bold; font-size: 12px');
  const response = await fetch('http://api.local/eventos');
  const datos = await response.json();
  return datos;
};

export const fetchEventoByIdREST = async (id) => {
  console.log('%c REST API: Pidiendo evento con ID ' + id, 'color: #10b981; font-weight: bold; font-size: 12px');
  const response = await fetch(`http://api.local/evento/${id}`);
  if (!response.ok) throw new Error('Evento no encontrado');
  return response.json();
};
