import React from "react";

export function Banner({ type, show, onClose }) {
	if (type === "success") {
		return (
			show && (
				<div className="success-banner">
					<p>Your suggestion has been submitted successfully! </p>{" "}
					&nbsp; &nbsp;
					<br></br>
					<button
						className="close-success-banner"
						onClick={onClose()}
					>
						×
					</button>
					<div className="loading-bar-container">
						<div className="loading-bar"></div>
					</div>
				</div>
			)
		);
	} else if (type === "delete") {
		return (
			show && (
				<div
					className="delete-success-banner"
					style={{ backgroundColor: "red" }}
				>
					<p>Your rating has been deleted successfully! </p> &nbsp;
					&nbsp;
					<br></br>
					<button
						className="close-delete-success-banner"
						onClick={onClose()}
					>
						×
					</button>
					<div className="loading-bar-container">
						<div className="loading-bar"></div>
					</div>
				</div>
			)
		);
	} else {
		return null;
	}
}
