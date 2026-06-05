import {useState} from 'react';
import React from 'react'
import '../components/GlobalLeaderboard/GlobalLeaderboard.css'
import Asteroid from '../components/GamePlay/sprites/Ship_active.png';
import BrickBreaker from '../components/GamePlay/sprites/BrickBreaker.png';


//temporary hardcoded values
const leaderBoardList = Array.from({ length: 10 }, (_, i) => ({
  userName: `Player${" " + (i + 1)}`,
  Score: 10000 - (i * 200),
}));


function GlobalLeaderboard() {
  return (
    <div>
      
        {/* buttons if we want to add different game leaderboards
        <div className = 'LeaderBoardButtons'>
          <button></button>
          <button></button>
          <button></button>
        </div> */}

      <div className='LeaderBoardRow'>
      <h1 style={{background: 'linear-gradient(to right, #ffffff, #ffa500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 100, lineHeight: '0.8'}}>༻❁༺ Leader Board ༻❁༺</h1>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {leaderBoardList.map((player, index) => (
            <li key={index} style={{ width: '100%', maxWidth: '800px' }}>
              <div className={index === 0 ? 'First' : 'Last'} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                {index === 0 && <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>⊹ ♛ ⊹</span>}
                <span style={{ flex: 1, minWidth: '10rem', textAlign: 'left' }}>{player.userName}</span>
                <span style={{ marginLeft: '2rem', fontWeight: 'bold' }}>{player.Score}</span>
                {index === 0 && <span style={{ fontSize: '1.5rem', marginLeft: '1rem'}}>⊹ ♛ ⊹</span>}
              </div>
            </li>
          ))}
      </ul>

    </div>
    </div>
  );
}
export default GlobalLeaderboard;
