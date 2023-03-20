import { useState } from "react";
import GuessPokemonDisplay from "./GuessPokemonDisplay";

function gameParameters() {
  const [generation, setGeneration] = useState(1);

  const GENERATION = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const LEVEL_CHALLENGE = ["Facile", "Normal", "Difficile"];

  return (
    <div>
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
      <GuessPokemonDisplay generation={generation} />
    </div>
  );
}

export default gameParameters;
