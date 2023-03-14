import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { createRating } from '../../store/rating';
// import { useState } from 'react';


export default function Rating () {
    const currentUser = useSelector(state => state.session.user);

    const [physiology, setPhysiology] = useState(0);
    const [safety, setSafety] = useState(0);
    const [love, setLove] = useState(0);
    const [esteem, setEsteem] = useState(0);
    const [cognition, setCognition] = useState(0);
    const [aesthetic, setAesthetic] = useState(0);
    const [selfActualization, setSelfActualization] = useState(0);
    const [transcendence, setTranscendence] = useState(0);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRating = {
            // userId: currentUser.id,
            physiology,
            safety,
            love,
            esteem,
            cognition,
            aesthetic,
            selfActualization,
            transcendence
    }

    console.log("Heres how you rated your day: ",
    "Physiology: ", newRating.physiology,
    "Safety: ", newRating.safety,
    "Love: ", newRating.love,
    "Esteem: ", newRating.esteem,
    "Cognition: ", newRating.cognition,
    "Aesthetic: ", newRating.aesthetic,
    "Self-Actualization: ", newRating.selfActualization,
    "Transcendence: ", newRating.transcendence)
    // dispatch(createRating(newRating)); to: do
    }

    return (
        <div>
            <form className="rating-form">
                <label>
                    <span>Transcendence</span>
                    <input type="number"
                        value={transcendence}
                        onChange={(e) => setTranscendence(e.target.value)}
                        placeholder="Transcendence"
                    />
                </label>
                <br></br>
                <label>
                    <span>Self-Actualization</span>
                    <input type="number"
                        value={selfActualization}
                        onChange={(e) => setSelfActualization(e.target.value)}
                        placeholder="Self-Actualization"
                    />
                </label>
                <br></br>
                <label>
                    <span>Aesthetic</span>
                    <input type="number"
                        value={aesthetic}
                        onChange={(e) => setAesthetic(e.target.value)}
                        placeholder="Aesthetic"
                    />
                </label>
                <br></br>
                <label>
                    <span>Cognition</span>
                    <input type="number"
                        value={cognition}
                        onChange={(e) => setCognition(e.target.value)}
                        placeholder="Cognition"
                    />
                </label>
                <br></br>
                <label>
                    <span>Esteem</span>
                    <input type="number"
                        value={esteem}
                        onChange={(e) => setEsteem(e.target.value)}
                        placeholder="Esteem"
                    />
                </label>
                <br></br>
                <label>
                    <span>Love</span>
                    <input type="number"
                        value={love}
                        onChange={(e) => setLove(e.target.value)}
                        placeholder="Love"
                    />
                </label>
                <br></br>
                <label>
                    <span>Safety</span>
                    <input type="number"
                        value={safety}
                        onChange={(e) => setSafety(e.target.value)}
                        placeholder="Safety"
                    />
                </label>
                <br></br>
                <label>
                    <span>Physiology</span>
                    <input type="number"
                        value={physiology}
                        onChange={(e) => setPhysiology(e.target.value)}
                        placeholder="Physiology"
                    />
                </label>
                <br></br>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}
