import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPins } from "../../store/pins";
import { fetchLikes } from "../../store/likes";
import PinItem from "./PinItem";
import "./PinBox.css";

export default function PinBox({ finalUser, user }) {
	const dispatch = useDispatch();

	const pins = useSelector((state) => state.pins);
	const likes = useSelector((state) => state.likes);

	const yourPage = user && finalUser && user._id === finalUser._id;
	const targetsPage = user && finalUser && user._id !== finalUser._id;

	useEffect(() => {
		if (finalUser && finalUser._id) {
			dispatch(fetchPins(finalUser._id));
			dispatch(fetchLikes(finalUser._id));
		}
	}, [dispatch, finalUser]);

	// cases:
		// your page, 
			// pins = render your pins
			// no pins = render a banner that says "head to suggestions to pin a suggestion"
		// target user page, 
			// pins = render their pins
			// no pins = render a banner that says "this user has no pins"

	const renderPins = () => {
		return (
			<div className="pins">
				{Object.values(pins).map((object, idx) => (
					<PinItem
						key={idx}
						suggestion={object}
						likes={likes}
						userPins={user.pins}
						isProfileSelf={yourPage}
					/>
				))}
			</div>
		);
	};

	const youHaveNoPins = () => {
		return (
			<div className="pins">
				<div className="banner-container">
					<h1 id="pin-banner">
						Head to the&nbsp;{" "}
						<Link to="/suggestions">
							<span id="sugg-prof-button">
								<em>suggestions</em>
							</span>
						</Link>
						&nbsp;page to pin suggestion
						{}
					</h1>
				</div>
			</div>
		);
	}

	const targetHasNoPins = () => {
		return (
			<div className="pins">
				<div className="banner-container">
					<h1 id="pin-banner">
						{finalUser.username} has no pins!
						{}
					</h1>
				</div>
			</div>
		);
	}

	if (pins && Object.values(pins).length > 0) {
		return renderPins();
	} else {
		if (yourPage) {
			return youHaveNoPins();
		} else if (targetsPage) {
			return targetHasNoPins();
		}
	}
}
