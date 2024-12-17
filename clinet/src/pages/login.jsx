import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');
    const navigate = useNavigate();

    const handleUser = (e) => {
        setUser(e.target.value);
    };

   
    const handlePass = (e) => {
        setPass(e.target.value);
    };

  
    const handleSubmit = (e) => {
        e.preventDefault();

     
        if (!username || !password) {
            alert('Please fill in both fields');
            return;
        }

        
        axios.post('http://localhost:3001/api/tours/login', { username, password })
            .then((result) => {
                if (result.data && result.data.message !== 'Invalid Password') {
                    console.log('Logged in, ', result);
                    navigate('/admin'); // Redirect to the admin page
                } else {
                    alert('Invalid credentials. Please try again.');
                }
            })
            .catch((err) => {
                console.error('Error during login:', err);
                alert('An error occurred. Please try again later.');
            });
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Admin Login</h1>
                <div className="login-form">
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={handleUser}
                        required
                    />
                </div>
                <div className="login-form">
                    <input
                        type="password"
                        value={password}
                        onChange={handlePass}
                        required
                        minLength={8}
                        maxLength={16}
                        placeholder="Password"
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
