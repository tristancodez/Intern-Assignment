
import './contact.css';

const ContactUs = () => {
    return (
        <div className="contact-page">
            <div className="contact-header">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you! Please reach out if you have any questions.</p>
            </div>

            <div className='contact-flex'>

            <div className="contact-details">
                <h3>Travel Agency Contact Details</h3>
                <div className="details">
                    <p><strong>Address:</strong> 123 Travel Lane, Cityville, Country</p>
                    <p><strong>Phone:</strong> +123 456 7890</p>
                    <p><strong>Email:</strong> contact@travelagency.com</p>
                    <p><strong>Business Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM</p>
                </div>
            </div>
            
            </div>
        </div>
    );
};

export default ContactUs;
