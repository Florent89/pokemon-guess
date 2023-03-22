import { useState } from "react";
import "./App.css";
import GameParameters from "./components/GameParameters";

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="game-container">
      <div className="flag-container">
        <h1>Devine le pokemon</h1>
        <GameParameters />
      </div>
    </div>
  );
}

export default App;
