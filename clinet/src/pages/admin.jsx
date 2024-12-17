import './admin.css';
import { useNavigate } from 'react-router-dom';

export default function Admin(){
    const navigate = useNavigate();
    const handlePackages = () =>{
        navigate('/admin-packages');
    }
    const handleBookings = () =>{
        navigate('/admin-bookings');
    }
    return(
        <div className='dashboard-container'>
            <h1>Dashboard</h1>
            <div className='dashboard-tile'>     
                <button onClick={handleBookings}>View Bookings</button>
            </div>
            <div className='dashboard-tile'>                
                <button onClick={handlePackages}>Manage Packages</button>
            </div>
        </div>
        
    )
}