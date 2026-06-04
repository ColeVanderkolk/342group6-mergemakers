import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">Virtual Arcade | </Link>
      <div className="nav-actions">
        <Link to="/GlobalLeaderboard" className="nav-button">Leaderboard</Link>
        <Link to="/profile" className="nav-button">Profile</Link>
        <Link to="/login" className="nav-button">Login</Link>
        <Link to="/signup" className="nav-button nav-button--primary">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navigation;