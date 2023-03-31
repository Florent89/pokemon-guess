import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import GuessPokemonDisplay from "./GuessPokemonDisplay";
import { setLevel, setGen } from "./Redux";
import RenderScore from "./RenderScore";

function gameParameters(props: { isAfterSave: Function }) {
  const [generation, setGeneration] = useState(1);
  const [difficult, setDifficult] = useState("Facile");

  const [isUpdate, setIsUpdate] = useState(true);

  const GENERATION = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const GENERATIONS_SOUND = [1, 2, 3, 4, 5, 6];

  const LEVEL_CHALLENGE = ["Facile", "Normal", "Difficile", "Hard", "Stratège"];

  const gamerOptions = useSelector((state: { gamer: any }) => state.gamer);

  const dispatch = useDispatch();

  const handleSetGeneration = (generation: number) => {
    setGeneration(generation);
    dispatch(setGen(generation));
    setIsUpdate(!isUpdate);
  };

  const handleSetDifficult = (level: string) => {
    setDifficult(level);
    if (generation > 6 && level === "Hard") {
      setGeneration(1);
    }
    dispatch(setLevel(level));
    setIsUpdate(!isUpdate);
  };

  const handleAfterSave = () => {
    props.isAfterSave();
  };

  const handleIsUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  return (
    <>
      <span className="guess-info-general">
        Attention, quand vous changez de difficulté ou de génération, votre
        score est remis à 0.
      </span>
      <div className="pokemons-container">
        <h2 className="game-subtitle">Génération</h2>
        {difficult !== "Hard"
          ? GENERATION.map((index) => {
              return (
                <span
                  key={index}
                  onClick={() => handleSetGeneration(index)}
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
                  onClick={() => handleSetGeneration(index)}
                  className={`generation-range ${
                    index === generation ? "active" : ""
                  }`}
                >
                  {index}
                </span>
              );
            })}
      </div>
      <div className="pokemons-level-container">
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
        <RenderScore
          handleIsUpdate={handleIsUpdate}
          difficult={difficult}
          isAfterSave={handleAfterSave}
        />
      </div>
    </>
  );
}

export default gameParameters;
