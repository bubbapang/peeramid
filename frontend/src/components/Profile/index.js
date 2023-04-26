import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getTargetUser } from "../../store/session";
import { fetchUserRatings, getRatings } from "../../store/ratings";

import Top from "./top";
import Bottom from "./bottom";

import "./Profile.css";

export default function Profile() {
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);
	const targetUser = useSelector((state) => state.session.targetUser);
	const targetUserId = useParams().userId;

	const finalUser = targetUser ? targetUser : sessionUser;

	const isProfileSelf = sessionUser._id === finalUser._id;

	const ratings = useSelector(getRatings);

	useEffect(() => {
		if (targetUserId) {
			dispatch(getTargetUser(targetUserId));
		}
	}, [dispatch, targetUserId]);

	useEffect(() => {
		setIsLoading(true);
		async function fetchData() {
			if (targetUserId) {
				await dispatch(fetchUserRatings(targetUserId))
			} else {
				await dispatch(fetchUserRatings(finalUser._id));
			}
		}
		fetchData().then(() => setIsLoading(false));
	}, [dispatch, finalUser, targetUserId]);

	const sortedRatings = ratings
		.slice()
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // sorting by date to make the pageUser's ratings LIFO

	if (isLoading || !finalUser) {
		return <div>Loading...</div>;
	}

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
				sortedRatings={sortedRatings}
				isProfileSelf={isProfileSelf}
				sessionUser={sessionUser}
				ratings={ratings}
			/>
		</div>
	);
}
