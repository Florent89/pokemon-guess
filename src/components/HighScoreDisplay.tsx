import { useEffect, useState } from "react";
import "../style/highscore.css";
import GamerService, { Gamer } from "../service/gamer-service";

function highScoreDisplay() {
  const [isShowHighScore, setIsShowHighScore] = useState(false);
  const [term, setTerm] = useState("");
  const [level, setLevel] = useState("");

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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = e.target.value;
    setLevel(level);

    if (level.length <= 1 || level === "") {
      GamerService.getGamers().then((gamers) => setGamers(gamers));
      return;
    }

    GamerService.searchGamer(level).then((gamers) => setGamers(gamers));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setTerm(term);

    if (term.length <= 1) {
      GamerService.getGamers().then((gamers) => setGamers(gamers));
      return;
    }

    GamerService.searchGamer(term).then((gamers) => setGamers(gamers));
  };

  const handleShowHighScore = () => {
    setIsShowHighScore(!isShowHighScore);
  };

  return (
    <div className="highscore-wrapper">
      <button className="button-show-score" onClick={() => getGamersScore()}>
        {!isShowHighScore ? "Afficher" : "Masquer"} les meilleurs résultats
      </button>
      {!isShowHighScore ? (
        ""
      ) : (
        <>
          <form className="gamer-form">
            <div className="input-pseudo">
              <input
                placeholder="Pseudo"
                value={term}
                onChange={(e) => handleInputChange(e)}
                className="guess-input"
              />
            </div>
            <div>
              <select value={level} onChange={(e) => handleSelectChange(e)}>
                <option value="">- Difficulté -</option>
                <option value="Facile">Facile</option>
                <option value="Normal">Normal</option>
                <option value="Difficile">Difficile</option>
                <option value="Hard">Hard</option>
                <option value="Hard">Stratège</option>
              </select>
            </div>
          </form>
          <table
            className={`table-wrapper ${!isShowHighScore ? "hidden" : ""}`}
          >
            <thead>
              <tr>
                <th colSpan={3}>Meilleurs Scores</th>
              </tr>
            </thead>
            <tbody>
              {gamers.map((element) => {
                return (
                  <tr key={element.id}>
                    <td key={element.pseudo}>{element.pseudo}</td>
                    <td key={element.level}>{element.level}</td>
                    <td key={element.score}>{element.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default highScoreDisplay;
