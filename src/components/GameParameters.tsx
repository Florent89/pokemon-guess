import { useState } from "react";
import GuessPokemonDisplay from "./GuessPokemonDisplay";
import RenderScore from "./RenderScore";

function gameParameters() {
  const [generation, setGeneration] = useState(1);
  const [total, setTotal] = useState(0);
  const [goodResponse, setGoodResponse] = useState(0);

  const GENERATION = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const LEVEL_CHALLENGE = ["Facile", "Normal", "Difficile"];

  const updateScore = (isResponseOk: boolean) => {
    let reste = total;
    let responseTotal = goodResponse;
    if (isResponseOk) {
      setGoodResponse((responseTotal += 1));
    }
    setTotal((reste += 1));
  };

  return (
    <>
      <div className="pokemons-container">
        <h2 className="game-subtitle">Génération</h2>
        {GENERATION.map((index) => {
          return (
            <span key={index} onClick={() => setGeneration(index)} className={`generation-range ${index === generation ? "active" : ""}`}>
              {index}
            </span>
          );
        })}
      </div>
      <GuessPokemonDisplay generation={generation} updateScore={updateScore} />
      <RenderScore score={goodResponse} total={total} />
    </>
  );
}

export default gameParameters;
