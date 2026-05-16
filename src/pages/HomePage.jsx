import {Link} from 'react-router-dom'
import react from 'react'
import Game from '../components/Game/Game.jsx'
import './HomePage.css';
export default function HomePage() {
    return (
    <div>THIS IS A TEST OF THE HOME PAGE
        <nav>
                <Link className='game-link' to='/asteroids'><Game/></Link>
        </nav>
    </div>
    );
}
