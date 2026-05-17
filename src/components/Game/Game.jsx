import './Game.css';


//game object should contain [image,name,description,page link]
export default function Game({game}) {

    return (
        <div className="Game">
            <p className = 'Game-Title'>{game.title}</p>
            <img className="Game-Image" src={game.image} alt = ""/>
        </div>
    )
}