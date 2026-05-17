import GameList from '../components/GameList/GameList.jsx'
import Navigation from '../components/Navigation/Navigation.jsx'
import GlobalLeaderBoard from '../components/GlobalLeaderboard/GlobalLeaderboard.jsx'
import './HomePage.css';

export default function HomePage() {
    return (
    <div>
        <p> THIS IS A TEST OF THE HOME PAGE</p>
        <Navigation/>
        <GlobalLeaderBoard/>
        <GameList/>
    </div>
    );
}
