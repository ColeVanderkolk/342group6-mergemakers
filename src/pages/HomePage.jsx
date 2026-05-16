import {Link} from 'react-router-dom'
import react from 'react'
import Game from '../components/Game/Game.jsx'
import GameList from '../components/GameList/GameList.jsx'
import Navigation from '../components/Navigation/Navigation.jsx'
import './HomePage.css';

export default function HomePage() {
    const testGame = {
    image: Image,
    title: 'Asteroids',
    description: 'survive for as long as possible in the asteroid belt!',
    gameLink: '/asteroids'
};

    return (
    <div>THIS IS A TEST OF THE HOME PAGE
        <Navigation/>
        <GameList/>
        <nav>
                <Link className='game-link' to='/asteroids'><Game game={testGame}/></Link>
        </nav>
    </div>
    );
}
