
import './about.css';  // Optional: for custom styling
import {Link} from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Welcome to your dream destination!</p>
      </header>

      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          We are a team of passionate travel enthusiasts committed to making your travel dreams come true.
          Our platform offers a seamless and reliable way to book tours, plan vacations, and explore unique experiences around the globe.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide every traveler with easy access to unforgettable travel experiences.
          Whether you're looking for relaxing beach resorts, adventurous treks, or cultural immersions, we have it all.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Values</h2>
        <ul>
          <li><strong>Customer First:</strong> We put our customers' needs at the heart of everything we do.</li>
          <li><strong>Innovation:</strong> We are constantly improving our services to offer the best travel experiences.</li>
          <li><strong>Trust & Safety:</strong> We ensure your safety and security through trusted partners and transparent booking processes.</li>
          <li><strong>Global Connections:</strong> Our network spans across numerous countries to give you diverse options for every type of traveler.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <p>
          With our easy-to-use platform, curated travel packages, and world-class customer service, planning your next vacation has never been easier. 
          We offer flexible payment options, expert guides, and real-time customer support to ensure your trip goes off without a hitch.
        </p>
      </section>

      <footer className="about-footer">
        <h3>Start your journey today!</h3>
        <button className="explore-button">
          <Link to="/" className="explore-link">Explore Our Tours</Link>
        </button>
      </footer>
    </div>
  );
};

export default About;
