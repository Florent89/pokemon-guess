export function normaliseResponse(
  response: string | undefined,
  pokemonName: string | undefined
) {
  return (
    response?.normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
    pokemonName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  );
}
