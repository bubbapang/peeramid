import React from "react";
import FeedItem from "../Feed/FeedItem";
import { Link } from "react-router-dom";
import "./Bottom.css";

export default function Bottom({ sortedRatings }) {
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

	return <div className="ratings-list">{renderRatingsList()}</div>;
}
