import {useState,useEffect} from 'react';
import React from 'react'
import '../components/GlobalLeaderboard/GlobalLeaderboard.css'
import Asteroid from '../components/GamePlay/sprites/Ship_active.png';
import BrickBreaker from '../components/GamePlay/sprites/BrickBreaker.png';
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./Forms.css";
//temporary hardcoded values
const leaderBoardList = Array.from({ length: 10 }, (_, i) => ({
  userName: `Player${" " + (i + 1)}`,
  stats: 10000 - (i * 200),
}));

//const leaderBoardList = 

function GlobalLeaderboard() {
  const [gameName, setGameName] = useState("Asteroids"); // default leaderboard
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [leaderboard,setLeaderboard] = useState([]);
  
  useEffect(() => {
      const load = async () => {
        try {
          console.log("fetching")
        const res = await fetch("/api/leaderboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({gameName, players: []}),
        });
        console.log("fetched")
        if (!res.ok) {
          console.log("there is a problem")
          throw new Error(data.error);
        }
        const data = await res.json();
        setLeaderboard(data.leaderboard.gameStats)
        console.log(leaderboard);
      } catch (err) {
          const message = err || "Error getting leaderboard.";
          setError(message);
          toast.error(message);
      }}
      load()
  },[]);
  
  
  return (
    <div>
      
        {/* buttons if we want to add different game leaderboards
        <div className = 'LeaderBoardButtons'>
          <button></button>
          <button></button>
          <button></button>//
        </div> */}

      <div className='LeaderBoardRow'>
      <h1 style={{background: 'linear-gradient(to right, #ffffff, #ffa500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 100, lineHeight: '0.8'}}>༻❁༺ Leader Board ༻❁༺</h1>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>

          {leaderboard.map((player, index) => (
            <li key={player.username} style={{ width: '100%', maxWidth: '800px' }}>
              <div className={index === 0 ? 'First' : 'Last'} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                {index === 0 && <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>⊹ ♛ ⊹</span>}
                <span style={{ flex: 1, minWidth: '10rem', textAlign: 'left' }}>{player.username}</span>
                <span style={{ marginLeft: '2rem', fontWeight: 'bold' }}>{player.stats[0].value}</span>
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
