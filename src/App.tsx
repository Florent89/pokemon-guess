import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GameParameters from "./components/GameParameters";

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      <h1>Devine le pokemon</h1>
      <GameParameters />
    </div>
  );
}

export default App;
