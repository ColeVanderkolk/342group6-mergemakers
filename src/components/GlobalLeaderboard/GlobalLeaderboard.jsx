import {useState} from 'react';
import React from 'react'
import './GlobalLeaderboard.css'
import Asteroid from '../GamePlay/sprites/Ship_active.png';
import BrickBreaker from '../GamePlay/sprites/BrickBreaker.png';



const example= {
  userName: "example_Player",
  Score: 2000,
};

const leaderBoardList = [example,example,example,example];


function GlobalLeaderboard({setScreen}) {
  return (
    <div>
        {/* Not sure what these are for can be added back if wanted
        <div className = 'LeaderBoardButtons'>
          <button></button>
          <button></button>
          <button></button>
        </div> */}

      <div className='LeaderBoardRow'>
      <p style={{fontSize:30}}>LeaderBoard</p>
      <ul>
          {leaderBoardList.map((player,index) => (
          <li key = {index}>
            <div className = {index === 0 ? 'First' : 'Last'}>
              <text>{'#' + (index +1)}</text> <text style={{marginLeft:'2rem',marginRight:'10rem'}}>{player.userName}</text> <text>{player.Score}</text>
              </div>
          </li>))}
      </ul>
    </div>
    </div>
  );
}
export default GlobalLeaderboard;