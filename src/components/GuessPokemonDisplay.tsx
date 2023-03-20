import { useEffect, useState } from "react";
import ModalResponsePokemon from "./ModalResponsePokemon";

type resultPokemon = {
  name: string;
  numero: number;
  type: string;
  height: string;
  weight: string;
  pokedexLink: string;
  imageUrl: string;
};

const API_URL = "https://api-pokemon-fr.vercel.app/api/v1/gen/";

function guessPokemonDisplay(props: { generation: number }) {
  const [pokemonToGuess, setPokemonToGuess] = useState<resultPokemon>();
  const [response, setResponse] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}${props.generation}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        randomisePokemon(res);
      });
  }, [props.generation]);

  function randomisePokemon(pokemonList: any): void {
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    const randomPokemon = pokemonList[randomIndex];
    setPokemonToGuess({
      name: randomPokemon["name"]["fr"],
      numero: randomPokemon.pokedexId,
      height: randomPokemon.height,
      weight: randomPokemon.weight,
      pokedexLink: `https://www.pokemon.com/fr/pokedex/${randomPokemon.pokedexId}`,
      type: transformType(randomPokemon.types),
      imageUrl: randomPokemon.sprites.regular,
    });
  }

  function transformType(types: { name: string }[]) {
    let arrayTypes: string[] = [];
    types.forEach((element) => {
      arrayTypes.push(element.name);
    });
    return arrayTypes.join(" et ");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(e.target.value);
  };

  function handleGuess(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();
    console.log(response);
    setIsShowModal(true);
  }

  function handleResponse(): void {
    //open dialog response
  }

  return (
    <div>
      <img src={pokemonToGuess?.imageUrl} alt={pokemonToGuess?.name} />
      <div>
        <form>
          <div>
            <input
              placeholder="Pokémon"
              name="pokemon"
              value={response}
              onChange={(e) => handleInputChange(e)}
            />
            <button onClick={(e) => handleGuess(e)}>Envoyer</button>
          </div>

          <button onClick={() => handleResponse()}>Aucune idée...</button>
        </form>
      </div>
      {isShowModal ? <ModalResponsePokemon pokemonName={response} /> : ""}
    </div>
  );
}

export default guessPokemonDisplay;
