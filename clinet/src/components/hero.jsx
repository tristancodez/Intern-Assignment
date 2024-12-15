
import './hero.css';

import "react-datepicker/dist/react-datepicker.css";
export default function Hero() {

    return (
      <section className='hero'>
        <div className='hero-section'>
          <div className='text'>
          <h1>
            Explore with us
          </h1>
          <p>"Explore the World with Us: Embark on unforgettable journeys to stunning destinations, where every moment is crafted for adventure, relaxation, and discovery. Whether you seek thrilling experiences, cultural immersions, or peaceful retreats, our tailor-made tours promise memories that last a lifetime."</p>
          </div>
        </div>
        
        {/* <img src={hero_image} alt='logo' role='presentation' className='banner'></img> */}
    
      </section>
    );
  }