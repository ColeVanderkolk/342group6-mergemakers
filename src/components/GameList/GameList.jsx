import Game from '../Game/Game.jsx';
import { Link } from 'react-router-dom';

import asteroidImage from '../GamePlay/sprites/Ship_active.png';
import brickImage from '../GamePlay/sprites/BrickBreaker.png';
import pongImage from '../GamePlay/sprites/pong_btn_image.png';

import './GameList.css'

function GameList() {

    const games = [
        {
            title: 'Asteroids',
            image: asteroidImage,
            gameLink: '/asteroids'
        },
        {
            title: 'Pong',
            image: pongImage,
            gameLink: '/pong'
        },
        {
            title: 'Brickbreaker',
            image: brickImage,
            gameLink: '/brickbreaker'
        }
    ];

    return (
        <nav className="game-row">

            {games.map((game) => (
                <Link key={game.title} to={game.gameLink} className="game-link">
                    <Game game={game} />
                </Link>
            ))}

        </nav>
    );
}

export default GameList;