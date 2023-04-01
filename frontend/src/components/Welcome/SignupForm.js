import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup, clearSessionErrors } from '../../store/session';
import './Welcome.css';
import { Link } from 'react-router-dom';

export default function Signup() {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const dispatch = useDispatch();
const history = useHistory();


const handleSubmit = async (e) => {
e.preventDefault();

const userCredentials = {
    firstName,
    lastName,
    username,
    email,
    password,
};

const success = await dispatch(signup(userCredentials));

if (success) {
    history.push('/feed');
}
};

return (
<>
    <div className="background">
    <div className="welcome-modal">
        <div className="welcome-form">
        <h1 id="title">Peeramid</h1>

        <form onSubmit={handleSubmit}>
            <label>
            First Name:
            <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            </label>

            <label>
            Last Name:
            <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            </label>

            <label>
            Username:
            <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </label>

            <label>
            Email:
            <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </label>

            <label>
            Password:
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </label>

            <div className="welcome-buttons">
            <input type="submit" value="Signup" />
            </div>
            <h1>Already have an account? <Link to='/'> Login </Link></h1>
        </form>
        </div>

        <div className="welcome-image" />
    </div>
    </div>
</>
);
}
