import React from 'react';
import PinItem from './PinItem';
import './Pin.css';

export default function Pin() {
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

    return (
        <div className="pins">
            {
                pinnedSuggestions.map((object, idx) =>
                    <PinItem key={idx} suggestion={Object.values(object)} />
                )
            }
        </div>
    )
}
