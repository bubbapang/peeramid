import React from 'react';
import PinItem from './PinItem';
import './Pin.css';

export default function Pin() {
    const pinnedSuggestions = [
        { body: 'You should transcend more' },
        { body: 'I worked out last week, it helped me!' },
        { body: 'You should meditate more' },
        { body: 'You should eat more vegetables' },
    ]

    return (
        <div className="pins">
            {
                pinnedSuggestions.map((suggestion, idx) =>
                    <PinItem key={idx} suggestion={suggestion[idx]} />
                )
            }
        </div>
    )
}
