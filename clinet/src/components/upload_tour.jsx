import './upload_tour.css';
import { useState } from 'react';

export default function UploadForm() {
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate input fields (optional)
    if (!location || !title || !description || !image || !price) {
      alert('Please fill in all fields!');
      return;
    }

    // Data to send in the request
    const tourData = {
      location,
      title,
      description,
      image,
      price: parseFloat(price), // Ensure price is sent as a number
    };

    try {
      // POST request to add-tour endpoint
      const response = await fetch('http://localhost:3001/api/tours/add-tour', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tourData),
      });

      // Handle response
      if (response.ok) {
        alert('Tour added successfully!');
        // Clear form after successful submission
        setLocation('');
        setTitle('');
        setDescription('');
        setImage('');
        setPrice('');
      } else {
        alert('Failed to add the tour.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the tour.');
    }
  };

  return (
    <div className="upload-container">
      <form className="upload-form" onSubmit={handleSubmit}>
        <label>Location: </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Destination"
        />
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
        />
        <label>Description: </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
        />
        <label>Image: </label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter Image URL"
        />
        <label>Price: </label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Price"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
