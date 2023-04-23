import { Link } from "react-router-dom";

// import chart dependencies
import { Line, Radar } from "react-chartjs-2";

// import other needed components to render in the profile
import FeedItem from "../Feed/FeedItem";
import Pin from "./Pin";

export default function Bottom({
    finalUser,
    radarData,
    radarOptions,
    lineData,
    lineOptions,
    sortedRatings,
}) {
    const renderRatingsList = () => {
        if (sortedRatings.length > 0) {
            return sortedRatings.map((rating, idx) => (
                <FeedItem key={idx} rating={rating} idx={idx} />
            ));
        }
        return (
            <div className="no-ratings">
                <h2 className="no-rating-heading">No ratings yet!</h2>
                <Link to="/rating" className="no-decor">
                    <div className="no-rating-nav">
                        Click to add your first rating on Today's page
                    </div>
                </Link>
            </div>
        );
    };

    return (
        <div className="bottom">
            <div className="charts-container">
                <div className="radar-chart-container">
                    <Radar data={radarData} options={radarOptions} />
                    <div className="suggestions">
                        <Pin finalUser={finalUser} />
                    </div>
                </div>
                <div className="line-chart-container">
                    <Line data={lineData} options={lineOptions} />
                </div>
                <div className="ratings">
                    <div className="ratings-list">
                        {renderRatingsList()}
                    </div>
                </div>
            </div>
        </div>
    );
}