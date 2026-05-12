import {useState} from 'react';
const example= {
  userName: "example_Player",
  Score: 2000,
}

const leaderBoardList = [example,example,example,example,example];



function Leaderboard({setScreen}) {
  return (
    <div> 
          <p>LearderBoard</p>
      <ul>
        <p>test</p>
        <p>test</p>
        {leaderBoardList.map((player,index) => (<li key = {index}>{player.userName + '  ' + player.Score}</li>))}</ul>
    </div>
  );
}
export default Leaderboard;
