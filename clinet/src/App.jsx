import './App.css'
import ToursList from './components/content';
import Hero from './components/hero';
import Navbar from './components/navbar';
import { Route,Routes } from 'react-router-dom';
// import Login from './pages/login';
import BookingPage from './pages/booking';
import Invoice from './pages/invoice';
import Admin from './pages/admin';
import About from './pages/about';
import ContactUs from './pages/contact';
import Footer from './components/footer';
import PackageManager from './pages/manage_packages';
import BookingManager from './pages/view_booking';
import Login from './pages/login';
import UploadForm from './pages/upload_tour';
import EditPackage from './pages/edit';

function App() {
  

  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<><Hero/><ToursList/></>} />
        <Route path = '/admin-packages' element={<PackageManager/>}/>
        <Route path='/admin-bookings' element={<BookingManager/>}/>
        <Route path="/edit-package" element={<EditPackage />} />
        <Route path='/add-package' element={<UploadForm/>}  />
        <Route path = '/login' element={<Login/>}/>
        <Route path = '/admin' element={<Admin/>}/> 
        <Route path='/booking' element={<BookingPage/>}/>
        <Route path = '/invoice' element={<Invoice/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
      </Routes>
      <Footer/>
      
      
      </div>
  )
}

// mongodb+srv://admin:admin123@cluster0.cr9di.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

export default App
