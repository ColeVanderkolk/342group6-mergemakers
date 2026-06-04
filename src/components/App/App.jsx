import {Routes,Route} from 'react-router-dom'
import Navigation from '../Navigation/Navigation.jsx';
import Asteroids from '../Asteroids/Asteroids.jsx';
import BrickBreaker from '../BrickBreaker/BrickBreaker.jsx';
import Pong from '../Pong/Pong.jsx';
import HomePage from '../../pages/HomePage.jsx';
import Signup from '../../pages/Signup.jsx';
import Login from '../../pages/Login.jsx';
import Profile from '../../pages/Profile.jsx';
import GlobalLeaderboard from '../../pages/GlobalLeaderboard.jsx';
import PageNotFound from '../../pages/PageNotFound.jsx';
import Footer from '../Footer/Footer.jsx';
import "./App.css";


function App() {
 return(
  <div>
  <>
  <Navigation/>
  <Routes>
      <Route path ="/" element={<HomePage/>}/>
      <Route path="/asteroids" element={<Asteroids/>}/>
      <Route path="/brickbreaker" element={<BrickBreaker/>}/>
      <Route path="/pong" element={<Pong/>}/>
      <Route path ="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/GlobalLeaderboard" element={<GlobalLeaderboard/>}/>
      <Route path ="*" element={<PageNotFound/>}/>
  </Routes>
  <Footer/>
  </>
  </div>
)
}
export default App;