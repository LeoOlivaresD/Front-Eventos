export const queryEventoByIdGraphQL = async (id) => {
  console.log('%cGraphQL: Pidiendo evento con ID ' + id, 'color: #f59e0b; font-weight: bold; font-size: 12px');
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
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
      `,
      variables: { id: parseInt(id) }
    })
  });
  const data = await response.json();
  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.evento;
};

export const queryAllEventosGraphQL = async () => {
  console.log('%cGraphQL: Pidiendo todos los eventos', 'color: #f59e0b; font-weight: bold; font-size: 12px');
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query GetEventos {
          eventos {
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
      `
    })
  });
  const data = await response.json();
  if (data.errors) throw new Error(data.errors[0].message);
  return data.data.eventos;
};
