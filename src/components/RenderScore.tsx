import { useEffect, useState } from "react";
import "../style/score.css";

function renderScore(props: { isUpdate: boolean }) {
  const [score, setScore] = useState<string | null>(null);
  const [total, setTotal] = useState<string | null>(null);

  useEffect(() => {
    setScore(sessionStorage.getItem("score"));
    setTotal(sessionStorage.getItem("totalResponse"));
  }, [props.isUpdate]);

  const reste = 30 - parseInt(total ?? "0");

  const result = (score: number) => {
    switch (true) {
      case score === 30:
        return "Bravo tu es un maître Pokémon de premier ordre ! PikaFélicitations";
      case score < 30 && score > 22:
        return "Tu es un vrai champion d'arène, encore une marche et tu seras un maître !";
      case score < 22 && score > 16:
        return "Tu es bon dresseur en devenir, il te reste encore du chemin à parcourir !";
      case score < 16 && score > 8:
        return "Tu commences tout juste ton aventure, courage tu vas y arriver !";
      case score < 8:
        return "Ba alors tu es tout ramoloss ou bien !";
    }
  };

  const handleRemoveSessionStorage = () => {
    sessionStorage.clear();
  };

  return (
    <>
      {reste > 0 ? (
        <div className="result-container">
          <p className="score-text">
            Score actuel <br /> {score} / 30
          </p>
          <p className="score-text">{reste} questions restantes</p>
        </div>
      ) : (
        <div className="result-text-container">
          <p className="result-text">Votre résultat final : {score} / 30</p>
          <p className="result-text">{result(parseInt(score ?? "0"))}</p>
          <button
            className="reset-score-button"
            onClick={() => handleRemoveSessionStorage()}
          >
            Recommencer
          </button>
        </div>
      )}
    </>
  );
}

export default renderScore;
