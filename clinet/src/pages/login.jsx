
import './login.css'
import { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login(){
     
    // const [email,setEmail] = useState();
    // const [password,setPass] = useState();
    // const navigate = useNavigate();

    
    // const handleEmail = (e)=>{
    //     setEmail(e.target.value);
    // }
    // const handlePass = (e)=>{
    //     setPass(e.target.value);
    // }

    // const handleSubmit=(e)=>{
    //     e.preventDefault();
    //     axios.post('http://localhost:3002/login',{email,password})
    //     .then(result=> {
    //         if(result.data && (result.data.message !== 'Invalid Password')){
    //             console.log('Logged in, ',result);
    //             navigate('/');
    //         }
    //         else{
    //             alert('Invalid password');
    //         }

    //         })
    //     .catch(err=> console.log(err))
    // }
    
    return(
        <div className='login-container'>
            <form className='login-form' action='submit' >
                <h1>Admin Login</h1>
                <div className='login-form'>
                    {/* <label>Email:</label> */}
                    <input type='text'placeholder='Username' required></input>
                </div>
                <div className='login-form'>
                    {/* <label>Password:</label> */}
                    <input type='password' required minLength={8} maxLength={16} placeholder='Password'></input>
                </div>
                <button type='submit'>Login</button>
                
            </form>
        </div>
    )

}