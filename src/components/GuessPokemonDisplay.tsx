import { useEffect, useState } from "react";
import ModalResponsePokemon from "./ModalResponsePokemon";
import "../style/guess.css";
import { normaliseResponse } from "../utils/normalise";
import { useDispatch, useSelector } from "react-redux";
import { setScore } from "./Redux";

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
  category: string;
  stats?: {
    hp: number;
    atk?: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  };
};

const API_URL = "https://api-pokemon-fr.vercel.app/api/v1/gen/";
const URL_NEW_CRIES = "https://pokemoncries.com/cries/";
const URL_OLD_CRIES = "https://pokemoncries.com/cries-old/";

function guessPokemonDisplay(props: {
  generation: number;
  difficult: string;
  handleIsUpdate: Function;
}) {
  const [pokemonList, setPokemonList] = useState<resultPokemon[]>([]);
  const [pokemonToGuess, setPokemonToGuess] = useState<resultPokemon>();
  const [response, setResponse] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const [isShiny, setIsShiny] = useState(false);
  const [isShowFirstClue, setIsShowFirstClue] = useState(false);
  const [isShowSecondClue, setIsShowSecondClue] = useState(false);

  const gamerOptions = useSelector((state: { gamer: any }) => state.gamer);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${API_URL}${props.generation}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        setPokemonList(res);
        randomisePokemon(res);
        setIsShowFirstClue(false);
        setIsShowSecondClue(false);
      });
  }, [props.generation, props.difficult]);

  const randomisePokemon = (pokemonList: any) => {
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
      category: randomPokemon.category,
      stats: randomPokemon.stats,
      imageUrlShiny:
        randomPokemon.sprites.shiny ?? randomPokemon.sprites.regular,
      pokemon_sound:
        props.generation < 7
          ? `${soundSource}${randomPokemon.pokedexId}.mp3`
          : "",
    });
  };

  const transformType = (types: { name: string }[]) => {
    let arrayTypes: string[] = [];
    types.forEach((element) => {
      arrayTypes.push(element.name);
    });
    return arrayTypes.join(" et ");
  };

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
      dispatch(
        setScore({
          score: gamerOptions.score + 1,
          total: gamerOptions.total + 1,
        })
      );
    } else {
      dispatch(
        setScore({ score: gamerOptions.score, total: gamerOptions.total + 1 })
      );
    }
    props.handleIsUpdate();
    setIsShowFirstClue(false);
    setIsShowSecondClue(false);
    setResponse("");
  };

  const handleGuess = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (response.length > 0) {
      setIsAnswer(true);
      setIsShowModal(true);
    }
  };

  const handleResponse = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsShowModal(true);
  };

  const handlePlaySound = (sound: string) => {
    let music = new Audio(sound);
    music.play();
  };

  const handleFirstClue = () => {
    setIsShowFirstClue(true);
  };

  const handleSecondClue = () => {
    setIsShowSecondClue(true);
  };

  return (
    <div className="guess-wrapper">
      <span className="guess-info">
        Attention, quand vous changez de difficulté ou de génération, votre
        score est remis à 0.
      </span>
      {props.difficult !== "Hard" && props.difficult !== "Stratège" ? (
        <>
          <button className="button-shiny" onClick={() => setIsShiny(!isShiny)}>
            Forme Shiny
          </button>
          <div className="img-wrapper">
            <img
              className={`flag-img ${props.difficult.toLowerCase()}`}
              src={
                isShiny
                  ? pokemonToGuess?.imageUrlShiny
                  : pokemonToGuess?.imageUrl
              }
              alt={pokemonToGuess?.name}
            />
          </div>
        </>
      ) : props.difficult === "Hard" ? (
        <div className="sound-container">
          <span className="guess-info">
            Vous avez deux indices à disposition
          </span>
          <span className="text-sound">Ecoutez le cri du pokémon</span>
          <button
            className="btn-sound"
            onClick={() => handlePlaySound(pokemonToGuess?.pokemon_sound ?? "")}
          >
            <i className="fa fa-play"></i>
          </button>
          <div className="sound-clue-container">
            {!isShowFirstClue ? (
              <span
                onClick={() => handleFirstClue()}
                className="button-shiny clue1"
              >
                Type
              </span>
            ) : (
              <span className="clue-text">{pokemonToGuess?.type}</span>
            )}
          </div>
          <div className="sound-clue-container">
            {!isShowSecondClue ? (
              <span
                onClick={() => handleSecondClue()}
                className="button-shiny clue2"
              >
                Catégorie
              </span>
            ) : (
              <span className="clue-text">{pokemonToGuess?.category}</span>
            )}
          </div>
        </div>
      ) : (
        <div className="stat-container">
          <h3 className="text-sound">Statistiques du Pokémon</h3>
          <div className="stats-array-container">
            <div className="stats-array-column">
              <span>PV</span>
              <span>Attaque</span>
              <span>Défense</span>
              <span>Attaque spéciale</span>
              <span>Défense spéciale</span>
              <span>Vitesse</span>
            </div>
            <div className="stats-array-column">
              <span>{pokemonToGuess?.stats?.hp}</span>
              <span>{pokemonToGuess?.stats?.atk}</span>
              <span>{pokemonToGuess?.stats?.def}</span>
              <span>{pokemonToGuess?.stats?.spe_atk}</span>
              <span>{pokemonToGuess?.stats?.spe_def}</span>
              <span>{pokemonToGuess?.stats?.vit}</span>
            </div>
          </div>
        </div>
      )}

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
            Je donne ma langue au miaouss
          </button>
        </form>
      </div>
      <div className={`result-modal-wrapper ${!isShowModal ? "hidden" : ""}`}>
        <ModalResponsePokemon
          pokemonName={response}
          isAnswer={isAnswer}
          pokemonToGuess={pokemonToGuess}
          handleClose={handleClose}
          level={props.difficult}
        />
      </div>
    </div>
  );
}

export default guessPokemonDisplay;
