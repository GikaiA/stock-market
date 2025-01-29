import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from './Landing/Landing';
import Register from './Register/Register';
import Login from './Login/Login';
import Navbar from './Navbar/Navbar';
import Dashboard from './Dashboard/Dashboard';
import Search from './Search/Search';

function App() {

  return (
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/search' element={<Search/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
