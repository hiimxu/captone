import {Routes,Route} from 'react-router-dom'
import "./App.css";
import Header from "./components/Header";
import HomePage from './components/HomePage';
import Register from "./components/Register";
import Login from './components/Login';
import Service from './components/Service';


function App() {
  return (
    <div className="App">
      
    <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/services' element={<Service/>}/>
    </Routes>
      
    </div>
  );
}

export default App;
