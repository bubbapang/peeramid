import React from 'react';
import './Need.css';

export default function Need ({ name, color, width }) {
    const style = {
        backgroundColor: color,
        width: width
    };

    return (
        <div className='need' style={style}>
            <h1>{name}</h1>
        </div>
    )
}
