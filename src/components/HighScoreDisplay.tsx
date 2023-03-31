import { useEffect, useState } from "react";
import "../style/highscore.css";
import GamerScoreService, { Gamer } from "../service/gamers-service";

function highScoreDisplay(props: { isAfterSave: boolean }) {
  const [isShowHighScore, setIsShowHighScore] = useState(false);
  const [term, setTerm] = useState("");
  const [level, setLevel] = useState("");
  const [generation, setGeneration] = useState(0);
  const [gamersScoreInit, setGamersScoreInit] = useState<Gamer[]>([]);

  const [gamers, setGamers] = useState<Gamer[]>([]);

  useEffect(() => {
    GamerScoreService.getGamerScores().then((gamers) => {
      gamers.sort(function (a, b) {
        return a.score + b.score;
      });
      if (gamers.length > 50) {
        gamers.length === 50;
      }
      setGamersScoreInit(gamers);
      setGamers(gamers);
    });
  }, [props.isAfterSave]);

  const getGamersScore = () => {
    handleShowHighScore();
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    input: string
  ) => {
    if (input === "level") {
      const level = e.target.value;
      setLevel(level);
      const newGamersList = gamersScoreInit.filter((element) => {
        console.log(level);
        if (level !== "" && generation !== 0) {
          return element.level === level && element.generation === generation;
        } else if (generation === 0) {
          if (level === "") {
            return element;
          } else {
            return element.level === level;
          }
        } else if (level === "") {
          return element.generation === generation;
        }
      });
      setGamers(newGamersList);
    } else {
      const generation = +e.target.value;
      setGeneration(generation);
      const newGamersList = gamersScoreInit.filter((element) => {
        console.log(generation);
        if (level !== "" && generation !== 0) {
          return element.level === level && element.generation === generation;
        } else if (level === "") {
          if (generation === 0) {
            return element;
          } else {
            return element.generation === generation;
          }
        } else if (generation === 0) {
          return element.level === level;
        }
      });
      setGamers(newGamersList);
    }
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const term = e.target.value;
  //   setTerm(term);

  //   if (term.length <= 1) {
  //     GamerService.getGamers().then((gamers) => setGamers(gamers));
  //     return;
  //   }

  //   GamerService.searchGamer(term).then((gamers) => setGamers(gamers));
  // };

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
            {/* <div className="input-pseudo">
              <input
                placeholder="Pseudo"
                value={term}
                onChange={(e) => handleInputChange(e)}
                className="guess-input"
              />
            </div> */}
            <div>
              <select
                value={level}
                onChange={(e) => handleSelectChange(e, "level")}
              >
                <option value="">- Difficulté -</option>
                <option value="Facile">Facile</option>
                <option value="Normal">Normal</option>
                <option value="Difficile">Difficile</option>
                <option value="Hard">Hard</option>
                <option value="Hard">Stratège</option>
              </select>
            </div>
            <div>
              <select
                value={generation}
                onChange={(e) => handleSelectChange(e, "generation")}
              >
                <option value="0">- Génération -</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
            </div>
          </form>
          <table
            className={`table-wrapper ${!isShowHighScore ? "hidden" : ""}`}
          >
            <thead>
              <tr>
                <th colSpan={4}>Meilleurs Scores</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pseudo</td>
                <td>Difficulté</td>
                <td>Génération</td>
                <td>Score</td>
              </tr>
              {gamers.map((element) => {
                return (
                  <tr key={element.id}>
                    <td key={element.pseudo}>{element.pseudo}</td>
                    <td key={element.level}>{element.level}</td>
                    <td key={element.generation}>{element.generation}</td>
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
