import {Link} from 'react-router-dom'
import react from 'react'
import Game from '../components/Game/Game.jsx'
import GameList from '../components/GameList/GameList.jsx'
import Navigation from '../components/Navigation/Navigation.jsx'
import LeaderBoard from '../components/Leaderboard/Leaderboard.jsx'
import './HomePage.css';

export default function HomePage() {
    const testGame = {
    image: Image,
    title: 'Asteroids',
    description: 'survive for as long as possible in the asteroid belt!',
    gameLink: '/asteroids'
};

    return (
    <div style={{columnCount:1,alignItems:'center',justifyContent:'center', display:'flex',flexDirection:'column'}}>
        <p> THIS IS A TEST OF THE HOME PAGE</p>
        <Navigation/>
        <LeaderBoard/>
        <GameList/>
        <nav>
                <Link className='game-link' to='/asteroids'><Game game={testGame}/></Link>
        </nav>
    </div>
    );
}
