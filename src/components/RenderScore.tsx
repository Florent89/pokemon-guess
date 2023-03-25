import { useEffect, useState } from "react";
import "../style/score.css";

function renderScore(props: { isUpdate: boolean; handleIsUpdate: Function }) {
  const [score, setScore] = useState<string | null>(null);
  const [total, setTotal] = useState<string | null>(null);
  const [reset, setReset] = useState(false);

  let urlImage = "";

  useEffect(() => {
    setScore(sessionStorage.getItem("score"));
    setTotal(sessionStorage.getItem("totalResponse"));
    setReset(false);
  }, [props.isUpdate]);

  let reste = 30 - parseInt(total ?? "0");

  const result = (score: number) => {
    reste = 30;
    switch (true) {
      case score === 30:
        urlImage = "src/assets/images/blue.png";
        return "Bravo tu es un maître Pokémon de premier ordre ! PikaFélicitations";
      case score < 30 && score > 23:
        urlImage = "src/assets/images/ondine.png";
        return "Tu es un vrai champion d'arène, encore une marche et tu seras un maître !";
      case score <= 23 && score >= 16:
        urlImage = "src/assets/images/topdresseur.png";
        return "Tu es bon dresseur en devenir, il te reste encore du chemin à parcourir !";
      case score < 16 && score >= 8:
        urlImage = "src/assets/images/unlast.jpg";
        return "Tu commences tout juste ton aventure, courage tu vas y arriver !";
      case score < 8:
        urlImage =
          "https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/79/regular.png";
        return "Ba alors tu es tout ramoloss ou bien !";
    }
  };

  const handleRemoveSessionStorage = () => {
    sessionStorage.setItem("score", "0");
    sessionStorage.setItem("totalResponse", "0");
    props.handleIsUpdate();
    setReset(true);
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
        <div className={`result-modal-wrapper ${reset ? "hidden" : ""}`}>
          <div className="result-text-container">
            <p className="result-text">
              Votre résultat final est de {score} sur 30 devinettes.
            </p>
            <p className="result-text">{result(parseInt(score ?? "0"))}</p>

            <div className="img-wrapper">
              <img className="result-img" src={urlImage} />
            </div>
            <button
              className="reset-score-button"
              onClick={() => handleRemoveSessionStorage()}
            >
              Recommencer
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default renderScore;
