import GamePlay from "..//GamePlay/GamePlay.jsx";
import PlayerInfo from "..//PlayerInfo/PlayerInfo.jsx";
import Leaderboard from "..//Leaderboard/Leaderboard.jsx";
import Start from "../Start.jsx";
import CommentsSection from "../CommentsSection/CommentsSection.jsx";
import { useState } from "react";
function Asteroids() {
  const [screen, setScreen] = useState("start");
  const [user] = useState({ name: "Guest", id: null });
  const [lastScore, setLastScore] = useState(null);

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
            onGameOver={handleGameOver}
          />
        )}

        {screen === "leaderboard" && (
          <Leaderboard setScreen={setScreen} lastScore={lastScore} />
        )}
        {screen === "playerInfo" && (
          <PlayerInfo setScreen={setScreen}/>
        )}
      </div>
      <CommentsSection gameName="Asteroids" />
    </div>
  )
}

export default Asteroids;