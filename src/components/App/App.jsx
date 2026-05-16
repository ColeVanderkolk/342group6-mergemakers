import {Routes,Route} from 'react-router-dom'
import Asteroids from '../Asteroids/Asteroids.jsx';
import HomePage from '../../pages/HomePage.jsx';
import Signup from '../../pages/Signup.jsx';
import Login from '../../pages/Login.jsx';
import PageNotFound from '../../pages/PageNotFound.jsx';
import "./App.css";


function App() {
 return( 
  <div>
  <>
  <Routes>
      <Route path ="/" element={<HomePage/>}/>
      <Route path="/asteroids" element={<Asteroids/>}/>
      <Route path ="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path ="*" element={<PageNotFound/>}/>
  </Routes>
  </>
  </div>
)
}
export default App;