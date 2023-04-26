// importing react dependencies
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// importing chart data
import {
	getLineChartData,
	getLineChartOptions,
	getRadarChartData,
	getRadarChartOptions,
} from "./chartData";

import { fetchUserRatings, getRatings } from "../../store/ratings";

// import the top and bottom components
import Top from "./top";
import Bottom from "./bottom";

// css
import "./Profile.css";
// import { is } from "date-fns/locale";
// import { isPast } from "date-fns";
// import { getCurrentUser, getTargetUser } from "../../store/session";

// start of Profile component
export default function Profile() {
	// set up state
	const [lineData, setLineData] = useState({ labels: [], datasets: [] });
	const [radarData, setRadarData] = useState({ labels: [], datasets: [] });
	const [lineOptions, setLineOptions] = useState({});
	const [radarOptions, setRadarOptions] = useState({});

	const [isLoading, setIsLoading] = useState(false);

	// set up dispatch
	const dispatch = useDispatch();

	// get current user and ratings from the store
	const sessionUser = useSelector((state) => state.session.user);
	const targetUser = useSelector((state) => state.session.targetUser);

	// final user
	const finalUser = targetUser ? targetUser : sessionUser;

	// is the profile self?
	const isProfileSelf = sessionUser._id === finalUser._id;

	// get the pertinent ratings from the store, be it the current user's or the target user's
	const ratings = useSelector(getRatings);

	useEffect(() => {
		setIsLoading(true);
		async function fetchData() {
			// await dispatch(getCurrentUser()); // Fetch current user
			// await dispatch(getTargetUser(targetUserId)); // Fetch target user
			await dispatch(fetchUserRatings(finalUser._id)); // Fetch user ratings
		}
		fetchData().then(() => setIsLoading(false));
	}, [dispatch, finalUser]);

	// Update chart data and options

	useEffect(() => {
		if (finalUser) {
			setIsLoading(false);
		}

		const lineChartData = getLineChartData(ratings);
		const radarChartData = getRadarChartData(ratings);
		const lineChartOptions = getLineChartOptions();
		const radarChartOptions = getRadarChartOptions();

		setLineData(lineChartData);
		setRadarData(radarChartData);
		setLineOptions(lineChartOptions);
		setRadarOptions(radarChartOptions);
	}, [ratings, finalUser]);

	// setup sorted ratings
	const sortedRatings = ratings
		.slice()
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // sorting by date to make the pageUser's ratings LIFO

	// init the top and bottom functions.
	// extract these to their own components at a later point, as this file is getting too big: 400+ lines

	if (isLoading || !finalUser) {
		return <div>Loading...</div>;
	}

	// render the page
	return (
		<div className="profile-page">
			{Top({
				sessionUser,
				targetUser,
				finalUser,
				sortedRatings,
			})}
			<Bottom
				finalUser={finalUser}
				radarData={radarData}
				radarOptions={radarOptions}
				lineData={lineData}
				lineOptions={lineOptions}
				sortedRatings={sortedRatings}
				isProfileSelf={isProfileSelf}
				sessionUser={sessionUser}
			/>
		</div>
	);
}
