import { useState } from "react";
import "../style/highscore.css";

function highScoreDisplay() {
  const [isShowHighScore, setIsShowHighScore] = useState(false);

  const users = [
    { score: 20, level: "Facile", Pseudo: "Toto" },
    { score: 18, level: "Hard", Pseudo: "Pouetos" },
    { score: 5, level: "Normal", Pseudo: "Thipo" },
  ];

  const handleShowHighScore = () => {
    setIsShowHighScore(!isShowHighScore);
  };

  return (
    <div>
      <button className="button-show-score" onClick={() => handleShowHighScore()}>
        {!isShowHighScore ? "Afficher" : "Masquer"} les meilleurs résultats
      </button>
      {!isShowHighScore ? (
        ""
      ) : (
        <div>
          <table className={`table-wrapper ${!isShowHighScore ? "hidden" : ""}`}>
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
