import { resultPokemon } from "./GuessPokemonDisplay";
import "../style/guess.css";
import { normaliseResponse } from "../utils/normalise";

function modalResponsePokemon(props: { pokemonName: string; isAnswer: boolean; pokemonToGuess: resultPokemon | undefined; handleClose: Function; level: string }) {
  return (
    <div className="result-modal-container">
      <h3 className={`result-heading ${normaliseResponse(props.pokemonName.toLowerCase(), props.pokemonToGuess?.name?.toLowerCase()) ? "win" : ""}`}>
        {normaliseResponse(props.pokemonName.toLowerCase(), props.pokemonToGuess?.name?.toLowerCase()) ? "Bien joué" : "Dommage"}
      </h3>
      <div className="result-answer-container">
        <span className="result-overheading">Il fallait trouver</span>
        <h3 className="result-pokemonName">{props.pokemonToGuess?.name}</h3>
        {props.level === "Hard" ? (
          <div className="img-wrapper" style={{ marginLeft: "36px" }}>
            <img className="flag-img" src={props.pokemonToGuess?.imageUrl} alt={props.pokemonToGuess?.name} />
          </div>
        ) : (
          ""
        )}
        <p className="result-text">
          Ce pokémon a le numéro
          <span className="result-numero"> {props.pokemonToGuess?.numero}</span> du Pokédex national. <br />
          Il mesure <span className="result-height">{props.pokemonToGuess?.height}</span> et pèse <span className="result-weight">{props.pokemonToGuess?.weight}</span>. Il est de
          type <span className="result-type">{props.pokemonToGuess?.type}</span>.
        </p>
        <a target="_blank" href={props.pokemonToGuess?.pokedexLink} rel="nooponer noreferrer" className="result-pokedex-link">
          Voir la fiche pokédex
        </a>
        <button className="play-again-button" onClick={() => props.handleClose(false)}>
          Rejouer
        </button>
      </div>
    </div>
  );
}

export default modalResponsePokemon;
