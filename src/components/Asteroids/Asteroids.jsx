import GamePlay from "..//GamePlay/GamePlay.jsx";
import PlayerInfo from "..//PlayerInfo/PlayerInfo.jsx";
import Leaderboard from "..//Leaderboard/Leaderboard.jsx";
import Start from "../Start.jsx";
import { useState } from "react";
function Asteroids() {
  const [screen, setScreen] = useState("start");
  const [user, setUser] = useState({ name: "Guest", id: null });
  const [lastScore, setLastScore] = useState(0);
  // Bridge gamplay and leaderboard
  const handleGameOver = (score) => {
    setLastScore(score);
    setScreen("leaderboard");
  };

  return(
    <div className="body">
      <div className="game">
        {screen === "start" && <Start setScreen={setScreen} user={user} />}
        
        {screen === "game" && (
          <GamePlay 
            setScreen={setScreen} 
            user={user} 
            onGameOver={handleGameOver} // Integration logic
          />
        )}

        {screen === "leaderboard" && (
          <Leaderboard setScreen={setScreen}/>
        )}
        {screen === "playerInfo" && (
          <PlayerInfo setScreen={setScreen}/>
        )}
      </div>
    </div>
  )
}

export default Asteroids;