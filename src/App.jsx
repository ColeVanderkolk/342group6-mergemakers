import GamePlay from "./components/GamePlay.jsx";
import Start from "./components/Start.jsx";
import "./App.css";
import { useState } from "react";

function App() {
  const [screen, setScreen] = useState("start");

  return(
    <div className="body">
      <div className="game">
        {screen === "start" && (
          <Start setScreen={setScreen} />
        )}
        {screen === "game" && (
          <GamePlay setScreen={setScreen}/>
        )}
      </div>
    </div>
  )
}

export default App;