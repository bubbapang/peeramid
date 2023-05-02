import './About.css'

export default function About() {
    return (
        <div className="about-us">
            <h1>Meet the team!</h1>
            <br></br>
            <div className="team-members">
                <div className="adam">
                    <img src="https://avatars.githubusercontent.com/u/49807160?v=4" alt="profile" />
                    <h2>Adam Pangelinan</h2>
                    {/* github and linkedIn buttons */}
                    <button className="github"><a href="https://github.com/bubbapang" target="_blank" rel="noreferrer"><i className="fab fa-github fa-2x"></i></a></button>
                    <button className="linkedin"><a href="https://www.linkedin.com/in/adam-pangelinan-8695a0159/ " target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a></button>    
                    <br></br>
                    <p>Software Engineer: Javascript, React-Redux, Express, Node | MongoDB | Ruby, Rails | Python, Tkinter | GIT, SQL, AWS | HTML, CSS</p>
                </div>

                <div className="jasmine">
                    <img src="https://secure.gravatar.com/avatar/ecc6365cf941a678ce1ad7973d0bd922?secure=true&size=300" alt="profile" />
                    <h2>Jasmine Kobata</h2>
                    <button className="github"><a href="https://github.com/JasmineKobata" target="_blank" rel="noreferrer"><i className="fab fa-github fa-2x"></i></a></button>
                    <button className="linkedin"><a href="https://www.linkedin.com/in/jdirksen/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a></button>    
                    <br></br>

                    <p>Software & Computer Engineer [C, C++, Ruby, Rails, React, Java, Javascript, HTML, SQL]</p>
                </div>

                <div className="madhur">
                    <img src="https://secure.gravatar.com/avatar/c1547344e5b21a1886ba39f5a4b1a4dc?secure=true&size=300" alt="profile" />
                    <h2>Madhur Luthra</h2>
                    <button className="github"><a href="https://github.com/mluthra01" target="_blank" rel="noreferrer"><i className="fab fa-github fa-2x"></i></a></button>
                    <button className="linkedin"><a href="https://www.linkedin.com/in/madhur-luthra-08a53a126/ " target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a></button>    
                    <br></br>

                    <p>Full Stack Software Engineer | JavaScript (ES6) | React | Redux | Ruby | Rails | Node.js | Express | PostgreSQL | MongoDB</p>
                </div>

                <div className="andre">
                    <img src="https://secure.gravatar.com/avatar/3be1c20c36536ddb706d1b2926c93465?secure=true&size=300" alt="profile" />
                    <h2>Andre Hanna</h2>
                    <button className="github"><a href="https://github.com/andrehanna8" target="_blank" rel="noreferrer"><i className="fab fa-github fa-2x"></i></a></button>
                    <button className="linkedin"><a href="https://www.linkedin.com/in/andre-hanna/ " target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a></button>    
                    <br></br>
        
                    <p>Fullstack Software Engineer | Javascript | Ruby | React.js | Redux.js | Ruby on Rails | Git | Express | PostgreSQL</p>
                </div>
            </div>
        </div>
    )
}