import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Need from './Need';
import { receiveRating, createRating } from '../../store/ratings';
import './Rating.css';

export default function Rating () {
    const dispatch = useDispatch();
    const [transcendence, setTranscendence] = useState(0);
    const [actualization, setSelfActualization] = useState(0);
    const [aesthetics, setAesthetic] = useState(0);
    const [cognition, setCognition] = useState(0);
    const [esteem, setEsteem] = useState(0);
    const [love, setLove] = useState(0);
    const [safety, setSafety] = useState(0);
    const [physiology, setPhysiology] = useState(0);

    let handleSubmit = (e) => {
        e.preventDefault();
        const newRating = {
            transcendance: transcendence,
            actualization,
            aesthetics,
            knowledge: cognition,
            esteem,
            love,
            safety,
            physiological: physiology
        }
        console.log(newRating)
        dispatch(createRating(newRating))
    }

    const handleRating = (name, rating) => {
        switch (name) {
            case "Transcendence":
                setTranscendence(rating);
                break;
            case "Actualization":
                setSelfActualization(rating);
                break;
            case "Aesthetics":
                setAesthetic(rating);
                break;
            case "Cognition":
                setCognition(rating);
                break;
            case "Esteem":
                setEsteem(rating);
                break;
            case "Love":
                setLove(rating);
                break;
            case "Safety":
                setSafety(rating);
                break;
            case "Physiology":
                setPhysiology(rating);
                break;
            default:
                break;
        }
    };

    const namesOfNeeds = ["Transcendence", "Actualization", "Aesthetics", "Cognition", "Esteem", "Love", "Safety", "Physiology"];
    const colorsOfNeeds = ["#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#4d908e","#577590"];
    const widthsOfNeeds = [500, 600, 700, 800, 900, 1000, 1100, 1200];

    return (
        <div className='needs-wrapper'>
            <button className='info'>Info</button>
            <div className='needs'>
                {namesOfNeeds.map((name, idx) => {
                    const color = colorsOfNeeds[idx];
                    const width = widthsOfNeeds[idx];
                    return (
                        <Need key={idx} name={name} color={color} width={width} onRatingChange={handleRating} />
                    )
                }, [])}
            </div>
            <button className='submit' onClick={handleSubmit}
            // {() => {
            //     console.log("Transcendence:", transcendence,
            //                 "Actualization:", actualization,
            //                 "Aesthetics:", aesthetics,
            //                 "Cognition:", cognition,
            //                 "Esteem:", esteem,
            //                 "Love:", love,
            //                 "Safety:", safety,
            //                 "Physiology:", physiology
            //     );
            // }}
            >Submit</button>
        </div>
    )
}