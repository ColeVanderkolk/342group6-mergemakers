
import Image from '../GamePlay/sprites/Ship_active.png';
import './Game.css';


//game object should contain [image,name,description,page link]
export default function Game({game}) {

    return (
        <div className="Game" style={{columnCount:1}}>
            <img className="Game-Image" src={Image} alt = ""/>
            <p className = 'Game-Title'>Asteroids</p>
            <text className = 'Game-Description'>survive for as long as possible in the asteroid belt!</text>
        </div>
    )
}