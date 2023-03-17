import React, { useState } from 'react';
import './Welcome.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

export default function Welcome() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);

  const handleDemo = (e) => {
    e.preventDefault();
    const demoCredentials = {
      email: 'andre@user.io',
      password: 'password',
    };
    dispatch(login(demoCredentials));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userCredentials = {
      email,
      password,
    };
  
    try {
      await dispatch(login(userCredentials));
    } catch (error) {
      window.alert(error.message);
    }
  };
  

  if (currentUser) {
    history.push('/feed');
  }

  return (
    <div className="background">
      <div className="welcome-modal">
        <div className="welcome-form">
          <h1 id="title">Peeramid</h1>
          <div className="fas fa-user-circle fa-6x" />

          <form onSubmit={handleSubmit}>
            <div className='login-box'>
              </div>
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
              <button>Login</button>
              <NavLink to="/signup">
                <button >Signup</button>
              </NavLink>
              <button onClick={handleDemo}>
                Demo
              </button>
            </div>
          </form>
        </div>
        <div className="welcome-image" />
      </div>
    </div>
  );
}
