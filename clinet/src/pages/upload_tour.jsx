import './upload_tour.css';
import { useState } from 'react';
import axios from 'axios';

export default function UploadForm() {
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      price: parseFloat(price),
    };

    try {
      // Sending POST request with tour data
      const response = await axios.post('http://localhost:3001/api/tours/add-tour', tourData);

      // Check for successful response status
      if (response.status === 201) {
        alert('Tour added successfully!');
        
        // Reset form fields after successful submission
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
      <h1>Create New Tour Package</h1>
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
