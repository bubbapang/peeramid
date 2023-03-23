import React from 'react';
import PinItem from './PinItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Pin.css';

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

    if (!pins || Object.values(pins).length === 0) {
        return null;
    }

    return (
        <div className="pins">
            {
                // pins.map((object, idx) =>
                //     <PinItem key={idx} suggestion={object} />
                // )
                Object.values(pins).map((object, idx) =>
    <PinItem key={idx} suggestion={object} />
)


            }

        </div>
    )
}
