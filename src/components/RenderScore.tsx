import { useDispatch, useSelector } from "react-redux";
import "../style/score.css";
import { resetGamer } from "./Redux";
import SaveFormScore from "./SaveFormScore";

function renderScore(props: { handleIsUpdate: Function; difficult: string }) {
  const gamerOptions = useSelector((state: { gamer: any }) => state.gamer);
  const dispatch = useDispatch();

  let urlImage = "";

  const result = (score: number) => {
    switch (true) {
      case score === 30:
        urlImage =
          "https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/130/regular.png";
        return "Bravo tu es un maître Pokémon de premier ordre ! PikaFélicitations";
      case score < 30 && score > 23:
        urlImage =
          "https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/31/regular.png";
        return "Tu es un vrai champion d'arène, encore une marche et tu seras un maître !";
      case score <= 23 && score >= 16:
        urlImage =
          "https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/8/regular.png";
        return "Tu es bon dresseur en devenir, il te reste encore du chemin à parcourir !";
      case score < 16 && score >= 8:
        urlImage =
          "https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/133/regular.png";
        return "Tu commences tout juste ton aventure, courage tu vas y arriver !";
      case score < 8:
        urlImage =
          "https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/79/regular.png";
        return "Ba alors tu es tout ramoloss ou bien !";
    }
  };

  const handleResetGamerOptions = () => {
    dispatch(resetGamer());
    props.handleIsUpdate();
  };

  return (
    <>
      {30 - gamerOptions.total < 0 ? (
        <div className="result-container">
          <p className="score-text">Score actuel : {gamerOptions.score} / 30</p>
          <p className="score-text">
            {30 - gamerOptions.total} questions restantes
          </p>
        </div>
      ) : (
        <div className={`result-modal-wrapper hidden}`}>
          <div className="result-text-container">
            <p className="result-text">
              Votre résultat final est de {gamerOptions.score ?? "0"} sur 30
              devinettes.
            </p>
            <p className="result-text">{result(gamerOptions.score)}</p>

            <div className="img-result-wrapper">
              <img className="result-img" src={urlImage} />
            </div>
            <SaveFormScore
              score={gamerOptions.score}
              level={gamerOptions.level}
              isSavingGamer={handleResetGamerOptions}
            />
            <button
              className="reset-score-button"
              onClick={() => handleResetGamerOptions()}
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
