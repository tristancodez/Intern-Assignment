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
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  const tour = location.state?.tour || {};

  const pricePerTraveler = tour?.price; // Example price per traveler, this can be fetched dynamically
  const gstRate = 0.18;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };
  const calculateTotalAmount = () => {
    const startDate = new Date(userDetails.start_date);
    const endDate = new Date(userDetails.end_date);
    const timeDifference = endDate - startDate; // difference in milliseconds
    const numberOfDays = timeDifference / (1000 * 3600 * 24); // convert milliseconds to days
    
    const totalPrice = pricePerTraveler * userDetails.travelers * numberOfDays;
    const gst = totalPrice * gstRate;
    const cgst = gst / 2;
    const sgst = cgst;
    const grandTotal = totalPrice+gst;

    return { totalPrice, gst, cgst, sgst, numberOfDays, grandTotal };
  };

  
  

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    setBookingError('');

    const { totalPrice, gst, cgst, sgst, numberOfDays, grandTotal } = calculateTotalAmount();

    const newInvoice = {
        invoiceId: Math.floor(Math.random() * 100000), // Example invoice ID
        name: userDetails.name,
        age: userDetails.age,
        email: userDetails.email,
        contact: userDetails.contact,
        travelers: userDetails.travelers,
        start_date: userDetails.start_date,
        end_date: userDetails.end_date,
        special_req: userDetails.special_req,
        totalPrice,
        gst,
        cgst,
        sgst,
        numberOfDays,
        grandTotal,
      };
    
      setInvoice(newInvoice);

    try {
      const response = await axios.post('http://localhost:3001/api/bookings/add-booking', userDetails);

      alert(`Booking confirmed! Your invoice ID is: ${response.data.invoiceId}`);
      setIsBooking(true);

      // Generate invoice content
      setInvoice({
        ...userDetails,
        invoiceId: response.data.invoiceId,
      });
      navigate('/invoice',{state: {invoice:newInvoice,tour:tour}});

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
                onChange={handleInputChange}  // Handles date change correctly
                required 
              />
            </div>
            <div className='form-item'>
              <label>End Date:</label>
              <input 
                type='date' 
                name='end_date'
                value={userDetails.end_date}
                onChange={handleInputChange}  // Handles date change correctly
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
