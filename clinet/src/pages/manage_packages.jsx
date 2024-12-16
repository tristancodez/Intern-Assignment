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

  const handleBookNow = (tour) =>{
    navigate('/booking',{state:{tour}});
  };

  return (
    <div className='admin-content-container'>
      
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

      <h2>Tour Packages</h2>

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
              <button onClick={()=> handleBookNow(tour)} >Book now</button>
              <button>Edit</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PackageManager;
