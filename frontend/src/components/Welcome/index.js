import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './welcome.css';

import { login, clearSessionErrors } from '../../store/session';

export default function Welcome () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.session.errors);
  const dispatch = useDispatch();
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const currentUser = useSelector(state => state.session.user);

const hideSignupShowLogin = () => {
  setShowSignUpForm(false);
  setShowLoginForm(true);
}

const hideLoginShowSignup = () => {
  setShowLoginForm(false);
  setShowSignUpForm(true);
}


  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }
  if (currentUser) {
    window.location.href = '/feed';
  } else {
    return (
      <div className="welcome">
        <div className="welcome-form">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Log In Form</h2>
            <div className="errors">{errors?.email}</div>
            <label>
              <span>Email</span>
              <input type="text"
                value={email}
                onChange={update('email')}
                placeholder="Email"
              />
            </label>
            <div className="errors">{errors?.password}</div>
            <label>
              <span>Password</span>
              <input type="password"
                value={password}
                onChange={update('password')}
                placeholder="Password"
              />
            </label>
            <input
              type="submit"
              value="Log In"
              disabled={!email || !password}
            />
          </form>
          <p> Already have an account? <button onClick={showSignUpForm}> Sign in </button> </p>
        </div>
      </div>
    );

  }
}

