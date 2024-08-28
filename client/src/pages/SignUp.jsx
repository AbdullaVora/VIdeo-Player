import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/signUp', {
                name, email, password
            });
            console.log(response.data);

            if (response.status === 201) {
                alert('Data added successfully!');
            }


        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div>
            <div className="login-container">
                <div className="login-box">
                    <h1 className="login-title">SignIn</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="Name">Name</label>
                            <input type="Name" id="Namee" placeholder="Enter your Name" required onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="login-button" >signIn</button>
                    </form>
                    <Link to={'/'}><button type="button" className="login-button" style={{ marginTop: '10px' }} onClick={handleLogin}>Login</button></Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
