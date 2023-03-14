import React, { useState } from 'react';
import Need from './Need';
import './Rating.css';

export default function Rating () {

    const [transcendence, setTranscendence] = useState(0);
    const [selfActualization, setSelfActualization] = useState(0);
    const [aesthetic, setAesthetic] = useState(0);
    const [cognition, setCognition] = useState(0);

    const [esteem, setEsteem] = useState(0);
    const [love, setLove] = useState(0);
    const [safety, setSafety] = useState(0);
    const [physiology, setPhysiology] = useState(0);

    const namesOfNeeds = ["Transcendence", "Self-Actualization", "Aesthetic", "Cognition", "Esteem", "Love", "Safety", "Physiology"];
    const colorsOfNeeds = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3", "#000000"];
    const widthsOfNeeds = [500, 550, 600, 650, 700, 750, 800, 850];

    const handleSubmit = (e) => {
         e.preventDefault();
         console.log("Heres how you rated your day:",
         "Transcendence:", transcendence,
         "Self-Actualization: ", selfActualization,
         "Aesthetic: ", aesthetic,
         "Cognition: ", cognition,
         "Esteem: ", esteem,
         "Love: ", love,
         "Safety: ", safety,
         "Physiology: ", physiology,
         )
    }

    return (
        <div className='needs-wrapper'>
            <div className='needs'>
                {namesOfNeeds.map((name, idx) => {
                    const color = colorsOfNeeds[idx];
                    const width = widthsOfNeeds[idx];
                    return (
                        <Need key={idx} name={name} color={color} width={width}/>
                    )
                }, [])}
                {/* <form onSubmit={handleSubmit}>
                    <input type="submit" value="Submit" />
                </form> */}
            </div>
        </div>
    )
}