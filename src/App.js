import {Routes,Route} from 'react-router-dom'
import "./App.css";
import Header from "./components/Header";
import HomePage from './components/HomePage';
import Favorite from './components/Favorite';
import Location from './components/Location';
import Register from "./components/Register";
import Login from './components/Login';
import Service from './components/Service';
import About from './components/About';


function App() {
  return (
    <div className="App">
      
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/location' element={<Location/>}/>
      <Route path='/favorite' element={<Favorite/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/register' element={<Register/>}/>      
      <Route path='/login' element={<Login/>}/>
      <Route path='/services' element={<Service/>}/>
    </Routes>
      
    </div>
  );
}

export default App;
