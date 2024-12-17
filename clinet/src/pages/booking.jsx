import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import './booking.css';

const BookingPage = () => {

  const location = useLocation();
  const [userDetails, setUserDetails] = useState({
    name: '',
    age: 0,
    email: '',
    contact: '',
    travelers: 1,
    special_req: '',
    start_date: '', 
    end_date: '',
  });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const navigate = useNavigate();

  const tour = location.state?.tour || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    setBookingError('');

    const { name, age, email, contact, travelers, special_req, start_date, end_date } = userDetails;
    const newBookingData = {
      name,
      age,
      email,
      contact,
      travelers,
      special_req,
      start_date,
      end_date,
      tour_title: tour?.title || 'No Title',
      tour_location: tour?.location || 'No Location',
    };

    try {
      const response = await axios.post('http://localhost:3001/api/bookings/add-booking', newBookingData);

      alert(`Booking confirmed! Your booking ID is: ${response.data._id}`); // Assuming the backend sends back the saved booking with an _id
      setIsBooking(true);

      
      navigate('/invoice', { state: { booking: response.data, tour: tour } });

    } catch (error) {
      console.error('Error creating booking:', error);
      setBookingError('Something went wrong, please try again.');
    }
  };

  return (
    <section className='booking'>
      <h2>Booking Form for {tour?.title || 'Unavailable Tour'}</h2>
      <div className='booking-container'>
        
        <div className='booking-container-block'>
          <img src={tour?.image} width='500px' height='300px' alt={tour?.title} />
        </div>

        <div className='booking-container-block'>
          <form onSubmit={handleBookingSubmit} className='booking-form'>
            <div className='form-item'>
              <label>Name:</label>
              <input 
                type='text' 
                name='name' 
                value={userDetails.name} 
                onChange={handleInputChange} 
                placeholder='Enter Name' 
                required 
              />
            </div>
            <div className='form-item'>
              <label>Age:</label>
              <input 
                type='number' 
                name='age' 
                value={userDetails.age} 
                onChange={handleInputChange} 
                placeholder='Enter Age' 
                required 
              />
            </div>
            <div className='form-item'>
              <label>Email:</label>
              <input 
                type='email' 
                name='email' 
                value={userDetails.email} 
                onChange={handleInputChange} 
                placeholder='Enter Email' 
                required 
              />
            </div>
            <div className='form-item'>
              <label>Contact:</label>
              <input 
                type='tel' 
                name='contact' 
                value={userDetails.contact} 
                onChange={handleInputChange} 
                placeholder='Enter Contact' 
                required 
              />
            </div>
            <div className='form-item'>
              <label>Travelers:</label>
              <input 
                type='number' 
                name='travelers' 
                value={userDetails.travelers} 
                onChange={handleInputChange} 
                placeholder='Enter Number of Travelers' 
                required 
              />
            </div>
            <div className='form-item'>
              <label>Special Request:</label>
              <input 
                type='text' 
                name='special_req' 
                value={userDetails.special_req} 
                onChange={handleInputChange} 
                placeholder='Enter Special Requests (Optional)' 
              />
            </div>
            <div className='form-item'>
              <label>Start Date:</label>
              <input 
                type='date'
                name='start_date'
                value={userDetails.start_date}
                onChange={handleInputChange}  
                required 
              />
            </div>
            <div className='form-item'>
              <label>End Date:</label>
              <input 
                type='date' 
                name='end_date'
                value={userDetails.end_date}
                onChange={handleInputChange}  
                required 
              />
            </div>
            {bookingError && <div className="error">{bookingError}</div>}
            <div className='form-item'>
              <button type='submit'>Confirm Booking</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
