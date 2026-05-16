
import Image from '../GamePlay/sprites/Ship_active.png';
import './Game.css';

export default function Game() {

    return (
        <div className="Game" style={{columnCount:1}}>
            <img className="Game-Image" src={Image} alt = ""/>
            <p className = 'Game-Title'>Asteroids</p>
            <text className = 'Game-Description'>survive for as long as possible in the asteroid belt!</text>
        </div>
    )
}