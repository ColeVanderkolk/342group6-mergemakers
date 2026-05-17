import {Link} from 'react-router-dom'
import react from 'react'
import GameList from '../components/GameList/GameList.jsx'
import Navigation from '../components/Navigation/Navigation.jsx'
import './HomePage.css';
import asteroidImage from '../components/GamePlay/sprites/Ship_active.png';
import brickImage from '../components/GamePlay/sprites/BrickBreaker.png';

export default function HomePage() {
    return (
    <div>THIS IS A TEST OF THE HOME PAGE
        <Navigation/>
        <GameList/>
    </div>
    );
}
