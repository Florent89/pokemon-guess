import "../style/score.css";

function renderScore() {
  const score = parseInt(sessionStorage.getItem("score") ?? "0");
  const total = parseInt(sessionStorage.getItem("totalResponse") ?? "0");

  console.log(score, total);
  const reste = 30 - total;

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
    <div className="result-container">
      {reste > 0 ? (
        <>
          <p className="score-text">
            Score actuel <br /> {score} / 30
          </p>
          <p className="score-text">{reste} questions restantes</p>
        </>
      ) : (
        <>
          <p className="score-text">Votre résultat final : {score} / 30</p>
          <p className="score-text">{result(score)}</p>
          <button
            className="reset-score-button"
            onClick={() => handleRemoveSessionStorage()}
          >
            Recommencer
          </button>
        </>
      )}
    </div>
  );
}

export default renderScore;
