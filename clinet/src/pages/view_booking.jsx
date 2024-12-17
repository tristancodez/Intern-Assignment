import axios from "axios";
import { useEffect, useState } from "react";
import './view_booking.css';

export default function BookingManager() {
  const [bookings, fetchBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:3001/api/bookings/all-bookings');
        fetchBookings(response.data);
      } catch (error) {
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookingsData();
  }, []);

  return (
    <div className="booking-manager">
      <h1>Booking List</h1>

      {loading ? (
        <div className="loading">Loading bookings...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : bookings.length === 0 ? (
        <p>No Bookings Yet</p>
      ) : (
        bookings.map((booking) => (
          <div className="booking-item" key={booking._id}>
            <h2>Booking ID: {booking._id}</h2>
            <p><strong>Name:</strong> {booking.name}</p>
            <p><strong>Age:</strong> {booking.age}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Contact:</strong> {booking.contact}</p>
            <p><strong>Travelers:</strong> {booking.travelers}</p>
            <p><strong>Start Date:</strong> {new Date(booking.start_date).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(booking.end_date).toLocaleDateString()}</p>
            <p><strong>Special Request:</strong> {booking.special_req || 'None'}</p>
            <p><strong>Destination:</strong> {booking.tour_location || 'Not Provided'}</p>
            <p><strong>Tour Package:</strong> {booking.tour_title || 'Not Provided'}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
