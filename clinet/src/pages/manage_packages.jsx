import { useEffect, useState } from 'react';
import axios from 'axios';
import './manage_packages.css'
import { useNavigate } from 'react-router-dom';



const PackageManager = () => {
  const [tours, setTours] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTours, setFilteredTours] = useState([]); 
  const navigate = useNavigate();


  
 
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tours/all-tours');
        setTours(response.data);
        setFilteredTours(response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchTours();
  }, []);

  
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const filtered = tours.filter((tour) =>
      tour.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTours(filtered);
  };


  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredTours(tours);
  };

  const handleClick=(e)=>{
    e.preventDefault();
    navigate('/add-package');
  }

  const handleEdit = (tourId) =>{
    console.log(tourId)
    navigate('/edit-package',{state:{edit_package: tourId}});
  }

  const handleDelete = async (tourId) => {
    try {
      // Make the DELETE request to your backend with the tour_id
      const response = await axios.delete(
        `http://localhost:3001/api/tours/delete-tour?tour_id=${tourId}`
      );

      if (response.status === 200) {
        alert('Tour deleted successfully!');
        // Remove the deleted tour from the local state
        setTours(tours.filter((tour) => tour._id !== tourId));
        setFilteredTours(filteredTours.filter((tour) => tour._id !== tourId));
      }
    } catch (error) {
      console.error('Error deleting the tour:', error);
      alert('An error occurred while deleting the tour.');
    }
  };

  return (

    
    <div className='admin-content-container'>
      <h2>To a create new package click below!</h2>
      <button id='upload-button' type="button" onClick={handleClick}>Add Tour</button>
      
      
      <div className='form-container'>
        <form onSubmit={handleSearchSubmit} className='search-bar'>
          <div className='search-item-location'>
            <input
              type='text'
              placeholder='Search Destination'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className='search-item'>
            <button type='submit'>Search</button>
          </div>

          
          <div className='search-item'>
            <button id = 'clear-btn' type='button' onClick={handleClearSearch}>Clear Search</button>
          </div>
        </form>
      </div>


      <div className='tour-list'>
        {filteredTours.length === 0 ? (
          <p>No tours found for the selected destination.</p>
        ) : (
          filteredTours.map((tour) => (
            <div className='tour-item' key={tour._id}>
              <img src={tour.image} alt={tour.title} width="400" height="200" />
              <h3>{tour.title}</h3>
              <label>Price per night: ${tour.price}</label>
              <p>{tour.description}</p>
              <div className='buttonClass'>
              <div className='edit-button'>
              <button type='button' onClick={()=>handleEdit(tour._id)}>Edit</button>
              </div>
              <div className='delete-button'>
              <button type='delete' onClick={() => handleDelete(tour._id)}>Delete</button>
              </div>
            </div>
            </div>
          ))
        )}
      </div>
    </div>
    
  );
};

export default PackageManager;
