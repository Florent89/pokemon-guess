import { useState } from "react";
import GuessPokemonDisplay from "./GuessPokemonDisplay";
import RenderScore from "./RenderScore";

function gameParameters() {
  const [generation, setGeneration] = useState(1);
  const [difficult, setDifficult] = useState("Facile");
  const [total, setTotal] = useState(0);
  const [goodResponse, setGoodResponse] = useState(0);

  const GENERATION = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const LEVEL_CHALLENGE = ["Facile", "Normal", "Difficile"];

  return (
    <>
      <div className="pokemons-container">
        <h2 className="game-subtitle">Génération</h2>
        {GENERATION.map((index) => {
          return (
            <span
              key={index}
              onClick={() => setGeneration(index)}
              className={`generation-range ${
                index === generation ? "active" : ""
              }`}
            >
              {index}
            </span>
          );
        })}
      </div>
      <div className="pokemons-container">
        <h2 className="game-subtitle">Difficulté</h2>
        {LEVEL_CHALLENGE.map((level, index) => {
          return (
            <span
              key={index}
              onClick={() => setDifficult(level)}
              className={`difficult-range ${
                level === difficult ? "active" : ""
              }`}
            >
              {level}
            </span>
          );
        })}
      </div>
      <div className="pokemon-display-container">
        <GuessPokemonDisplay generation={generation} difficult={difficult} />
        <RenderScore />
      </div>
      {/* <GuessPokemonDisplay generation={generation} difficult={difficult} />
      <RenderScore /> */}
    </>
  );
}

export default gameParameters;
