import React from 'react';
import PinItem from './PinItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Pin.css';
import {Link} from 'react-router-dom';
import { fetchPins, getPins } from '../../store/pins';

export default function Pin() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const pins = useSelector(state => state.pins)
    

    useEffect(() => {
        if (user && user._id) {
            dispatch(fetchPins(user))
        }
    }, [dispatch, user])

    const pinnedSuggestions = [
        { body: 'You should transcend more' },
        { body: 'I worked out last week, it helped me!' },
        { body: 'You should meditate more' },
        { body: 'You should eat more vegetables' },
        { body: 'You should drink more water' },
        { body: 'You should sleep more' },
        { body: 'You should exercise more' },
        { body: 'You should eat less junk food' },
        { body: 'You should eat less sugar' },
        { body: 'You should eat less meat' },
    ]

    
    if (!pins || Object.values(pins).length === 0) {
        return (
            <div className="pins">
                <h1 id="pin-banner">Head to the suggestions page to add suggestion</h1>
            </div>
        );
    }
    return (
        <div className="pins">
            {
                !pins ? (
                    <h1 id="pin-banner">Head to the suggestions page to pin a suggestion</h1>
                ) : (
                    Object.values(pins).map((object, idx) =>
                        <PinItem key={idx} suggestion={object} />
                    )
                )
            }
        </div>
    );
}

