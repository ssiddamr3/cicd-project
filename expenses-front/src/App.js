import logo from './logo.svg';
import './App.css';
import {Routes, Route,BrowserRouter } from 'react-router-dom';
import UserLogin from './UserLogin';
import UserHome from './UserHome';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path ='/' Component={UserLogin}/>
    <Route exact path ='/user-home' Component={UserHome}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
