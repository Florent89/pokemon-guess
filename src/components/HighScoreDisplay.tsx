import { useEffect, useState } from "react";
import "../style/highscore.css";
import GamerService, { Gamer } from "../service/gamer-service";

function highScoreDisplay() {
  const [isShowHighScore, setIsShowHighScore] = useState(false);

  const [gamers, setGamers] = useState<Gamer[]>([]);

  useEffect(() => {
    GamerService.getGamers().then((gamers) => setGamers(gamers));
  }, []);

  const users = [
    { score: 20, level: "Facile", Pseudo: "Toto" },
    { score: 18, level: "Hard", Pseudo: "Pouetos" },
    { score: 5, level: "Normal", Pseudo: "Thipo" },
  ];

  //Filtrer par gamers(search bar), filtrer par difficulté
  //Limiter à 10 la longueur du tableau

  const getGamersScore = () => {
    GamerService.getGamers().then((gamers) => setGamers(gamers));
    handleShowHighScore();
  };

  const handleShowHighScore = () => {
    console.log(gamers);
    setIsShowHighScore(!isShowHighScore);
  };

  return (
    <div>
      <button className="button-show-score" onClick={() => getGamersScore()}>
        {!isShowHighScore ? "Afficher" : "Masquer"} les meilleurs résultats
      </button>
      {!isShowHighScore ? (
        ""
      ) : (
        <div>
          <table
            className={`table-wrapper ${!isShowHighScore ? "hidden" : ""}`}
          >
            <thead>
              <tr>
                <th colSpan={3}>Meilleurs Scores</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pseudo</td>
                <td>Difficulté</td>
                <td>Score</td>
              </tr>
              {users.map((element) => {
                return (
                  <tr key={element.Pseudo}>
                    <td key={element.Pseudo}>{element.Pseudo}</td>
                    <td key={element.level}>{element.level}</td>
                    <td key={element.score}>{element.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default highScoreDisplay;
