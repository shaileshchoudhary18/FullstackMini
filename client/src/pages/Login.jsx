import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const { setAuthState } = useContext(AuthContext);

    let navigate = useNavigate();

    const login = () => {
        const data = { username, password };
        axios.post('http://localhost:3000/auth/login', data)
            .then((response) => {
                if (response.data.error) {
                    setAlert({ show: true, message: response.data.error, type: 'error' });
                } else {
                    localStorage.setItem('accessToken', response.data.token);
                    setAuthState({ username: response.data.username, id: response.data.id, status: true });
                    setAlert({ show: true, message: 'Login successful!', type: 'success' });
                    navigate('/'); // Navigate immediately after successful login
                }
            })
            .catch(() => {
                setAlert({ show: true, message: 'An error occurred. Please try again.', type: 'error' });
            });
    };

    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <div className='login-container'>
            <h2>Login</h2>
            {alert.show && (
                <div className={`alert ${alert.type}`}>
                    {alert.message}
                </div>
            )}
            <div className='input-group'>
                <input 
                    type="text" 
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter Username" 
                />
            </div>
            <div className='input-group'>
                <input 
                    type="password" 
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter Password" 
                />
            </div>
            <button onClick={login} className='login-button'>Login</button>
        </div>
    );
}

export default Login;
