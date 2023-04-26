import { Link } from "react-router-dom";
import { Line, Radar } from "react-chartjs-2";

import FeedItem from "../Feed/FeedItem";
import Pin from "./Pin";

export default function Bottom({
	finalUser,
	radarData,
	radarOptions,
	lineData,
	lineOptions,
	sortedRatings,
	isProfileSelf,
    sessionUser,
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
						<Pin
							finalUser={finalUser}
							isProfileSelf={isProfileSelf}
                            sessionUser={sessionUser}
						/>
					</div>
				</div>
				<div className="line-chart-container">
					<Line data={lineData} options={lineOptions} />
				</div>
				<div className="ratings">
					<div className="ratings-list">{renderRatingsList()}</div>
				</div>
			</div>
		</div>
	);
}
