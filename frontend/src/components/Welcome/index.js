import React from 'react';
import './Welcome.css';

export default function Welcome () {
  return (
    <>
        <div className="background">
          {/* <h1>THIS IS THE BACKGROUND</h1> */}
          <div className="welcome-modal">
            <div className='welcome-form'>

              <h1 id='title'>Peeramid</h1>

              <div className='profile-pic'/>
              <h2>Abraham Maslow</h2>

              <form>

                <label>
                  Email:
                  <input type="text" name="email" />
                </label>

                <label>
                  Password:
                  <input type="text" name="password" />
                </label>

                <div className='welcome-buttons'>
                  <input type="submit" value="Login" />
                  <input type="submit" value="Signup" />
                </div>

              </form>
            </div>

            <div className='welcome-image' />

          </div>
        </div>
    </>
  );
}
