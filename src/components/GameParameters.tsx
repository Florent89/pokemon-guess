import { useState } from "react";
import GuessPokemonDisplay from "./GuessPokemonDisplay";
import RenderScore from "./RenderScore";

function gameParameters() {
  const [generation, setGeneration] = useState(1);
  const [difficult, setDifficult] = useState("Facile");

  const [isUpdate, setIsUpdate] = useState(true);

  const GENERATION = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const GENERATIONS_SOUND = [1, 2, 3, 4, 5, 6, 7, 8];

  const LEVEL_CHALLENGE = ["Facile", "Normal", "Difficile", "Hard", "Stratège"];

  const handleSetDifficult = (level: string) => {
    setDifficult(level);
    if (generation === 9 && level === "Hard") {
      setGeneration(1);
    }
    sessionStorage.setItem("level", level);
    sessionStorage.removeItem("totalResponse");
    sessionStorage.removeItem("score");
    setIsUpdate(!isUpdate);
  };

  const handleIsUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  return (
    <>
      <div className="pokemons-container">
        <h2 className="game-subtitle">Génération</h2>
        {difficult !== "Hard"
          ? GENERATION.map((index) => {
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
            })
          : GENERATIONS_SOUND.map((index) => {
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
              onClick={() => handleSetDifficult(level)}
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
        <GuessPokemonDisplay
          generation={generation}
          difficult={difficult}
          handleIsUpdate={handleIsUpdate}
        />
        <RenderScore isUpdate={isUpdate} handleIsUpdate={handleIsUpdate} />
      </div>
    </>
  );
}

export default gameParameters;
