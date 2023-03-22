import "../style/score.css";

function renderScore(props: { score: number; total: number }) {
  const reste = 30 - props.total;

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

  return (
    <div className="result-container">
      {reste > 0 ? (
        <>
          <p className="score-text">
            Votre score actuel est de {props.score} / 30
          </p>
          <p className="score-text">Il reste {reste} questions</p>
        </>
      ) : (
        <>
          <p className="score-text">
            Votre résultat final : {props.score} / 30
          </p>
          <p className="score-result">{result(props.score)}</p>
        </>
      )}
    </div>
  );
}

export default renderScore;
