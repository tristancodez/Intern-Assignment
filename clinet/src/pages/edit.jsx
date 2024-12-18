import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './edit.css'; // You can style this component with your own CSS

const EditPackage = () => {
  const [tour, setTour] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // This will help us get the state passed from the PackageManager

  const tourId = location.state?.edit_package;
  console.log(tourId); // Get the tour ID passed through state

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/tours/${tourId}`);
        setTour(response.data); // Set the fetched tour data to state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tour details:', error);
        setLoading(false);
      }
    };

    if (tourId) {
      fetchTourDetails();
    }
  }, [tourId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTour((prevTour) => ({
      ...prevTour,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/api/tours/update-tour/${tourId}`,
        tour
      );
      if (response.status === 200) {
        alert('Tour updated successfully!');
        navigate('/admin'); // Redirect to the admin page after successful update
      }
    } catch (error) {
      console.error('Error updating the tour:', error);
      alert('Failed to update the tour.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-package-container">
      <h1>Edit Tour Package</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={tour.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={tour.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={tour.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={tour.image}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={tour.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update Tour</button>
      </form>
    </div>
  );
};

export default EditPackage;
