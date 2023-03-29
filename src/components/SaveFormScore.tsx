import { useState } from "react";

function saveFormScore(props: { score: string; level?: string }) {
  const [pseudo, setPseudo] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPseudo(e.target.value);
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(pseudo, props.score, props.level);
  };

  return (
    <div>
      <form className="guess-form">
        <span className="guess-info">Vous pouvez enregistrer votre score si vous le souhaitez</span>
        <span className="guess-info">
          Score : <span className="result-info">{props.score}</span>
        </span>
        <span className="guess-info">
          Difficulté : <span className="result-info">{props.level}</span>
        </span>
        <div className="input-row">
          <input placeholder="Pseudo" value={pseudo} onChange={(e) => handleInputChange(e)} className="guess-input" />
          <button className="guess-button" onClick={(e) => handleSave(e)}>
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}
export default saveFormScore;
