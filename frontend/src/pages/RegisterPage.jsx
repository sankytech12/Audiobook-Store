import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { register,login } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // const user=await axios.post('http://localhost:5050/api/users/register', { name, email, password });
            const user=await register(name, email, password);
            console.log("user",user.data);
            await login(email, password);
            navigate('/');
        } catch (error) {
            setErrorMessage('Error registering. Please try again.');
        }
    };

    return (
        <div className="register_container">
            <form onSubmit={handleRegister}>
                <h1 className='register_head'>Register</h1>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='register_btn' type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
