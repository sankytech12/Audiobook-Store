import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // await axios.post('http://localhost:5050/api/users/login', { email, password });
            const data=await login(email, password);
            document.cookie = `token=${data.token}`;
            console.log("cookie from login",document.cookie);
            console.log("data",data);
            navigate('/');
        } catch (error) {
          setErrorMessage('Error registering. Please try again.');
        }
    };

    return (
        <form onSubmit={handleLogin} className='login-form'>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
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
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;
