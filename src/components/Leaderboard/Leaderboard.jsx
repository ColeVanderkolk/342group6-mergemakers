import {useState} from 'react';

const example= {
  userName: "example_Player",
  Score: 2000,
}

const leaderBoardList = [example,example,example,example,example];



function Leaderboard({setScreen}) {
  return (
    <div> 
          <p style={{fontSize:30}}>LeaderBoard</p>
      <ul style={{listStyleType:'none'}}>
        <div style={{columnCount:2,fontSize:25}}><li>Player</li> <li>Score</li></div>
          {leaderBoardList.map((player,index) => (<li key = {index}>
          <ul style={{listStyleType:'none', }}>
            <div style={{columnCount:2}}>
              <li>{player.userName}</li> <li>{player.Score}</li>
            </div>
          </ul>
          </li>))}
      </ul>
    </div>
  );
}
export default Leaderboard;
