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
                <h3>View Bookings</h3>
                <p1>Total Bookings : 17</p1>
                <button onClick={handleBookings}>View Bookings</button>
            </div>
            <div className='dashboard-tile'>
                <h3>Manage Packages</h3>
                <p>Available Packages : 15</p>
                <button onClick={handlePackages}>Manage Packages</button>
            </div>
            
        </div>
        
    )
}