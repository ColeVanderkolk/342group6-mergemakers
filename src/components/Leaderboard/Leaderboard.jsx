const example = {
  userName: "example_Player",
  Score: 2000,
};

const leaderBoardList = [example, example, example, example, example];

function Leaderboard({ setScreen, lastScore }) {
  return (
    <div style={{ color: 'white', padding: 20 }}>
      <p style={{ fontSize: 30 }}>LeaderBoard</p>

      {lastScore !== null && lastScore !== undefined && (
        <p style={{ fontSize: 20 }}>Your last score: {lastScore}</p>
      )}

      <table style={{ margin: '0 auto', fontSize: 20, borderSpacing: '24px 4px' }}>
        <thead>
          <tr><th>Player</th><th>Score</th></tr>
        </thead>
        <tbody>
          {leaderBoardList.map((player, index) => (
            <tr key={index}>
              <td>{player.userName}</td>
              <td>{player.Score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => setScreen("start")} style={{ marginTop: 20 }}>
        Back to Menu
      </button>
    </div>
  );
}
export default Leaderboard;