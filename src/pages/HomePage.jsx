import GameList from '../components/GameList/GameList.jsx'
import Navigation from '../components/Navigation/Navigation.jsx'
import GlobalLeaderBoard from '../components/GlobalLeaderboard/GlobalLeaderboard.jsx'
import Footer from '../components/Footer/Footer.jsx'
import './HomePage.css';

export default function HomePage() {
    return (
    <div>
        <p> Are you ready to test your valor? </p>
        <GameList/>
    </div>
    );
}
