import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { clearSessionErrors } from "../../store/sessionErrors";
import "./Welcome.css";

export default function Login() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();
	const currentUser = useSelector((state) => state.session.user);
	const errors = useSelector((state) => state.sessionErrors);

	useEffect(() => {
		dispatch(clearSessionErrors());
	}, [dispatch]);

	let readableErrors;
	if (errors) {
		readableErrors = Object.entries(errors.errors);
		// map to a more readable format
		readableErrors = readableErrors.map((error) => {
			let errorType = error[0];
			let errorMessage = error[1];
			// capitalize first letter of error type
			errorType = errorType[0].toUpperCase() + errorType.slice(1);
			// remove underscores and replace with spaces
			errorType = errorType.replace(/_/g, " ");
			// capitalize first letter of each word
			errorType = errorType.replace(/\w\S*/g, (w) =>
				w.replace(/^\w/, (c) => c.toUpperCase())
			);
			return `${errorType}: ${errorMessage}`;
		});
	}

	const handleDemo = (e) => {
		e.preventDefault();
		const demoCredentials = {
			email: "lionel@gmail.com",
			password: "password",
		};
		dispatch(login(demoCredentials));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const userCredentials = {
			email,
			password,
		};

		await dispatch(login(userCredentials));
	};

	useEffect(() => {
		if (currentUser) {
			history.push("/feed");
		}
	}, [currentUser, history]);

	return (
		<div className="background">
			<div className="welcome-modal">
				<div className="welcome-form">
					<h1 id="title">Peeramid</h1>
					<div className="fas fa-user-circle fa-6x" />

					{/* render all errors for user feedback */}
					{readableErrors &&
						readableErrors.map((error, idx) => (
							<div key={idx} className="error-message">
								{error}
							</div>
						))}

					<form onSubmit={handleSubmit}>
						<div className="login-box"></div>
						<label>
							Email:
							<input
								type="text"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</label>
						<label>
							Password:
							<input
								type="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
						<div className="welcome-buttons">
							<button>Login</button>
							<NavLink to="/signup">
								<button>Signup</button>
							</NavLink>
							<button onClick={handleDemo}>Demo</button>
						</div>
					</form>
				</div>
				<div className="welcome-image" />
			</div>
		</div>
	);
}
