import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">342 Group 6</Link>
      <div className="nav-actions">
        <Link to="/login" className="nav-button">Login</Link>
        <Link to="/signup" className="nav-button nav-button--primary">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navigation;