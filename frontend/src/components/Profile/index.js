import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTargetUser } from "../../store/session";
import { fetchUserRatings, getRatings } from "../../store/ratings";
import Top from "./Top";
import Middle from "./Middle";
import Bottom from "./Bottom";
import "./Profile.css";

export default function Profile() {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.session.user);
	const ratings = useSelector(getRatings);

	const targetUserId = useParams().userId;
	const targetUser = useSelector((state) => state.session.targetUser);

	const finalUser = targetUser ? targetUser : user;

	const isProfileSelf = user && finalUser && user._id === finalUser._id;
	
	const sortedRatings = ratings
		.slice()
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	useEffect(() => {
		if (targetUserId) {
			dispatch(getTargetUser(targetUserId));
		}
	}, [dispatch, targetUserId]);

	useEffect(() => {
		async function fetchData() {
			if (targetUserId) {
				await dispatch(fetchUserRatings(targetUserId));
			} else if (finalUser) {
				await dispatch(fetchUserRatings(finalUser._id));
			}
		}
		fetchData();
	}, [dispatch, finalUser, targetUserId]);

	return (
		<div className="profile-page">
			{user && finalUser && (
				<>
					<Top
						user={user}
						finalUser={finalUser}
						ratingsLength={sortedRatings.length}
					/>
					<Middle
						finalUser={finalUser}
						isProfileSelf={isProfileSelf}
						user={user}
						ratings={ratings}
					/>
					<Bottom sortedRatings={sortedRatings} />
				</>
			)}
		</div>
	);
}
