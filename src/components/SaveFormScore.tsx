import { useState } from "react";
import GamerScoreService from "../service/gamers-service";

function saveFormScore(props: {
  score: number;
  level: string;
  generation: number;
  isSavingGamer: Function;
}) {
  const [pseudo, setPseudo] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPseudo(e.target.value);
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const gamer = {
      id: Math.floor((1 + Math.random()) * 0x10000),
      pseudo: pseudo,
      level: props.level,
      score: props.score,
      generation: props.generation,
      created: new Date(),
    };
    GamerScoreService.addGamerScore(gamer).then(() => {
      props.isSavingGamer();
    });
  };

  return (
    <div>
      <form className="guess-form">
        <span className="guess-info-form">
          Vous pouvez enregistrer votre score si vous le souhaitez
        </span>
        <span className="guess-info-form">
          Score : <span className="result-info">{props.score}</span>
        </span>
        <span className="guess-info-form">
          Difficulté : <span className="result-info">{props.level}</span>
        </span>
        <div className="input-row">
          <input
            placeholder="Pseudo"
            value={pseudo}
            onChange={(e) => handleInputChange(e)}
            className="guess-input"
          />
          <button className="guess-button" onClick={(e) => handleSave(e)}>
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}
export default saveFormScore;
