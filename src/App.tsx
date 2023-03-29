import "./App.css";
import GameParameters from "./components/GameParameters";
import HighScoreDisplay from "./components/HighScoreDisplay";

function App() {
  return (
    <div className="game-container">
      <div className="flag-container">
        <h1>Devine le pokemon</h1>
        <GameParameters />
      </div>
      <div className="float-container">
        <HighScoreDisplay />
      </div>
    </div>
  );
}

export default App;
