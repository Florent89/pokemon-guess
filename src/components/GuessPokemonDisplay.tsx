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
  imageUrlShiny: string;
  pokemon_sound?: string;
};

const API_URL = "https://api-pokemon-fr.vercel.app/api/v1/gen/";

function guessPokemonDisplay(props: { generation: number; difficult: string; handleIsUpdate: Function }) {
  const [pokemonList, setPokemonList] = useState<resultPokemon[]>([]);
  const [pokemonToGuess, setPokemonToGuess] = useState<resultPokemon>();
  const [response, setResponse] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const [isShiny, setIsShiny] = useState(false);

  const URL_NEW_CRIES = "https://pokemoncries.com/cries/";
  const URL_OLD_CRIES = "https://pokemoncries.com/cries-old/";

  const storageScore = sessionStorage.getItem("score");
  const storageTotal = sessionStorage.getItem("totalResponse");

  useEffect(() => {
    fetch(`${API_URL}${props.generation}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        setPokemonList(res);
        randomisePokemon(res);
      });
  }, [props.generation, props.difficult]);

  function randomisePokemon(pokemonList: any): void {
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    const randomPokemon = pokemonList[randomIndex];
    const soundSource = props.generation < 6 ? URL_OLD_CRIES : URL_NEW_CRIES;
    setPokemonToGuess({
      name: randomPokemon["name"]["fr"],
      numero: randomPokemon.pokedexId,
      height: randomPokemon.height,
      weight: randomPokemon.weight,
      pokedexLink: `https://www.pokemon.com/fr/pokedex/${randomPokemon.pokedexId}`,
      type: transformType(randomPokemon.types),
      imageUrl: randomPokemon.sprites.regular,
      imageUrlShiny: randomPokemon.sprites.shiny ?? randomPokemon.sprites.regular,
      pokemon_sound: props.generation !== 9 ? `${soundSource}${randomPokemon.pokedexId}.mp3` : "",
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
    if (normaliseResponse(response.toLowerCase(), pokemonToGuess?.name?.toLowerCase())) {
      const updateScore = parseInt(storageScore ?? "0") + 1;
      sessionStorage.setItem("score", updateScore.toString());
    }
    const updateTotal = parseInt(storageTotal ?? "0") + 1;
    sessionStorage.setItem("totalResponse", updateTotal.toString());
    props.handleIsUpdate();
    setResponse("");
  };

  function handleGuess(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.preventDefault();
    if (response.length > 0) {
      setIsAnswer(true);
      setIsShowModal(true);
    }
  }

  function handleResponse(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.preventDefault();
    setIsShowModal(true);
  }

  return (
    <div className="guess-wrapper">
      <span className="guess-info">Attention, quand vous changez de dfficulté, votre score est remis à 0.</span>

      {props.difficult !== "Hard" ? (
        <>
          <button className="button-shiny" onClick={() => setIsShiny(!isShiny)}>
            Forme Shiny
          </button>
          <div className="img-wrapper">
            <img className={`flag-img ${props.difficult.toLowerCase()}`} src={isShiny ? pokemonToGuess?.imageUrlShiny : pokemonToGuess?.imageUrl} alt={pokemonToGuess?.name} />
          </div>
        </>
      ) : (
        <figure>
          <figcaption>Ecoutez le cri du pokémon : </figcaption>
          <audio controls src={pokemonToGuess?.pokemon_sound}></audio>
        </figure>
      )}

      <div className="guess-container">
        <form className="guess-form">
          <div className="input-row">
            <input placeholder="Pokémon" value={response} onChange={(e) => handleInputChange(e)} className="guess-input" />
            <button className="guess-button" onClick={(e) => handleGuess(e)}>
              Envoyer
            </button>
          </div>

          <button className="pass-button" onClick={(e) => handleResponse(e)}>
            Je donne ma langue au miaouss
          </button>
        </form>
      </div>
      <div className={`result-modal-wrapper ${!isShowModal ? "hidden" : ""}`}>
        <ModalResponsePokemon pokemonName={response} isAnswer={isAnswer} pokemonToGuess={pokemonToGuess} handleClose={handleClose} level={props.difficult} />
      </div>
    </div>
  );
}

export default guessPokemonDisplay;
