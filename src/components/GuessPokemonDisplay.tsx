import { useEffect, useState } from "react";
import ModalResponsePokemon from "./ModalResponsePokemon";
import "../style/guess.css";
import { normaliseResponse } from "../utils/normalise";

export type resultPokemon = {
  name: string;
  numero: number;
  type: string;
  height: string;
  weight: string;
  pokedexLink: string;
  imageUrl: string;
};

const API_URL = "https://api-pokemon-fr.vercel.app/api/v1/gen/";

function guessPokemonDisplay(props: {
  generation: number;
  updateScore: Function;
}) {
  const [pokemonList, setPokemonList] = useState<resultPokemon[]>([]);
  const [pokemonToGuess, setPokemonToGuess] = useState<resultPokemon>();
  const [response, setResponse] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);

  //session storage

  useEffect(() => {
    fetch(`${API_URL}${props.generation}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        setPokemonList(res);
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

  const handleClose = () => {
    setIsShowModal(false);
    randomisePokemon(pokemonList);
    if (
      normaliseResponse(
        response.toLowerCase(),
        pokemonToGuess?.name?.toLowerCase()
      )
    ) {
      sessionStorage.setItem("result", "value");
      sessionStorage.setItem("totalResponse", "value");
      props.updateScore(true);
    } else {
      props.updateScore(false);
    }
    setResponse("");
  };

  function handleGuess(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();
    if (response.length > 0) {
      setIsAnswer(true);
      setIsShowModal(true);
    }
  }

  function handleResponse(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();
    setIsShowModal(true);
  }

  return (
    <>
      <div className="img-wrapper">
        <img
          className="flag-img"
          src={pokemonToGuess?.imageUrl}
          alt={pokemonToGuess?.name}
        />
      </div>
      <div className="guess-container">
        <form className="guess-form">
          <div className="input-row">
            <input
              placeholder="Pokémon"
              value={response}
              onChange={(e) => handleInputChange(e)}
              className="guess-input"
            />
            <button className="guess-button" onClick={(e) => handleGuess(e)}>
              Envoyer
            </button>
          </div>

          <button className="pass-button" onClick={(e) => handleResponse(e)}>
            Aucune idée...
          </button>
        </form>
      </div>
      <div className={`result-modal-wrapper ${!isShowModal ? "hidden" : ""}`}>
        <ModalResponsePokemon
          pokemonName={response}
          isAnswer={isAnswer}
          pokemonToGuess={pokemonToGuess}
          handleClose={handleClose}
        />
      </div>
    </>
  );
}

export default guessPokemonDisplay;
