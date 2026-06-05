// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Profile() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("User") || "null");
//   console.log(user);

//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       navigate("/login");
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("User");
//     navigate("/login");
//   };

//   if (!user) return null;

//   return (
//     <div style={{ color: "white", padding: "40px", textAlign: "center" }}>
//       <h2>Welcome, {user.username}!</h2>
//       {user.email && <p style={{ color: "#9ca3af" }}>{user.email}</p>}
//       <button
//         onClick={handleLogout}
//         style={{
//           marginTop: "24px",
//           padding: "10px 24px",
//           background: "#aa3bff",
//           border: "none",
//           borderRadius: "8px",
//           color: "white",
//           cursor: "pointer",
//           fontSize: "15px",
//         }}
//       >
//         Log out
//       </button>
//     </div>
//   );
// }

// export default Profile;
// Profile.jsx

import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  // TEMP MOCK USER
  const user = {
    username: "alice",
    email: "alice@example.com",
    friends: ["Alex", "Jordan", "Sam"],

    gameResults: [
      {
        gameName: "Pong",
        stats: [
          { statName: "wins", value: 12 },
          { statName: "losses", value: 5 },
        ],
      },

      {
        gameName: "Brickbreaker",
        stats: [
          { statName: "highScore", value: 4820 },
        ],
      },

      {
        gameName: "Asteroids",
        stats: [
          { statName: "survivalTime", value: 97 },
        ],
      },
    ],
  };

  const handleLogout = () => {
    console.log("Mock logout");
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