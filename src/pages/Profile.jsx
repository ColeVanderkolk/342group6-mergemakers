import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("User") || "null");
  console.log(user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    navigate("/login");
  };

  const getStat = (game, statName) => {
    const statObj = game.stats.find(
      (s) => s.statName === statName
    );

    return statObj?.value ?? 0;
  };

  return (
    <div className="profile-container">

      {/* PROFILE HEADER */}
      <div className="profile-card">

        <h2 className="profile-title">
          {user.username}
        </h2>

        <p className="profile-email">
          {user.email}
        </p>

        <p className="profile-friends">
          Friends: {user.friends.length}
        </p>

        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Log out
        </button>

      </div>

      {/* GAME SECTION */}
      <div className="stats-section">

        <h3 className="games-title">
          Game Stats
        </h3>

        <div className="games-grid">

          {user.gameResults.map((game) => (
            <div
              key={game.gameName}
              className="game-card"
            >

              <h3 className="game-title">
                {game.gameName}
              </h3>

              {game.gameName === "Pong" && (
                <div className="stat-row">

                  <p>
                    Wins: {getStat(game, "wins")}
                  </p>

                  <p>
                    Losses: {getStat(game, "losses")}
                  </p>

                </div>
              )}

              {game.gameName === "Brickbreaker" && (
                <p>
                  High Score:{" "}
                  {getStat(game, "highScore")}
                </p>
              )}

              {game.gameName === "Asteroids" && (
                <p>
                  Longest Survival:{" "}
                  {getStat(game, "survivalTime")}s
                </p>
              )}

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Profile;