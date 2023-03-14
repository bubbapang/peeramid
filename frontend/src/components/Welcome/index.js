import './Welcome.css';

export default function Welcome () {
  return (
    <>
        <div className="background">
          {/* <h1>THIS IS THE BACKGROUND</h1> */}
          <div className="welcome-modal">
            <div className='welcome-form'>
              <h1>THIS IS THE WELCOME MODAL FORM</h1>
            </div>
            <div className='welcome-image'>
              {/* <h1>THIS IS THE WELCOME MODAL IMAGE</h1> */}
            </div>
          </div>
        </div>
    </>
  );
}