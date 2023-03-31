import { useState } from "react";
import "./App.css";
import GameParameters from "./components/GameParameters";
import HighScoreDisplay from "./components/HighScoreDisplay";

function App() {
  const [isAfterSave, setIsAfterSave] = useState(false);

  const handleAfterSave = () => {
    setIsAfterSave(!isAfterSave);
  };

  return (
    <div className="game-container">
      <div className="flag-container">
        <h1>Devine le pokemon</h1>
        <GameParameters isAfterSave={handleAfterSave} />
      </div>
      <div className="float-container">
        <HighScoreDisplay isAfterSave={isAfterSave} />
      </div>
    </div>
  );
}

export default App;
