import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        let checkToken = localStorage.getItem('token');
        if(checkToken){
            // alert('success')
            navigate('/dashboard'); 
        } else {
            // alert('unsuccess')
            navigate("/");
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
    
            if (token) {
                navigate('/dashboard');
            } else {
                setError('Login failed');
            }
    
        } catch (error) {
            const errorMessage = error.response && error.response.data ? error.response.data.message : 'An error occurred';
            setError(errorMessage);
        }
    };
    

    return (
        <div>
            <div className="login-container">
                <div className="login-box">
                    <h1 className="login-title">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name='password'
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                        <Link to='/signUp'><button type="submit" className="login-button" style={{marginTop:'10px'}}>SignUp</button></Link>
                    {error && <div className="error-message">{error}</div>} {/* Display error message if exists */}
                </div>
            </div>
        </div>
    );
};

export default Login;


