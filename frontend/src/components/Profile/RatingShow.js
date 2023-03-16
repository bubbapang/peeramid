import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPublicRatings } from "../../store/ratings";
import { useSelector } from "react-redux";

const RatingShow = () => {

    const dispatch = useDispatch();
    const allRatings = useSelector(state => state.ratings)
    const ratings = Object.values(allRatings)

    return (
        <>
        {ratings.map(rating => (
            <div key={rating._id}>
                <div>Transcendance: {rating.transcendance}</div>
                <div>Actualization: {rating.actualization}</div>
                <div>knowledge: {rating.knowledge}</div>
                <div>esteem: {rating.esteem}</div>
                <div>love: {rating.love}</div>
                <div>safety: {rating.safety}</div>
                <div>physiological: {rating.physiological}</div>
                <div>highlights: {rating.highlights}</div>
                <div>lowlights: {rating.lowlights}</div>
            
                
            </div>
        ))}
        </>
    )
}

export default RatingShow