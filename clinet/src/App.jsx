import './App.css'
import ToursList from './components/content';
import Hero from './components/hero';
import Navbar from './components/navbar';
import { Route,Routes } from 'react-router-dom';
import Login from './pages/login';
import BookingPage from './pages/booking';

function App() {
  

  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<><Hero/><ToursList/></>} />
        <Route path = '/admin' element={<Login/>}/>
        <Route path='/booking' element={<BookingPage/>}/>
      </Routes>
      
      
      </div>
  )
}

export default App