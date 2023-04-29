import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup } from "../../store/session";
import { clearSessionErrors } from "../../store/sessionErrors";
import { Link } from "react-router-dom";
import "./Welcome.css";

export default function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();
	const dispatch = useDispatch();
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		const userCredentials = {
			firstName,
			lastName,
			username,
			email,
			password,
		};
		const success = await dispatch(signup(userCredentials));

		if (success) {
			history.push("/feed");
		}
	};

	return (
		<>
			<div className="background">
				<div className="welcome-modal">
					<div className="welcome-form">
						<h1 id="title">Peeramid</h1>
							
						{/* render all errors for user feedback */}
						{readableErrors &&
							readableErrors.map((error, idx) => (
								<div key={idx}>{error}</div>
							))}

						<form onSubmit={handleSubmit}>

							<label>
								First Name:
								<input
									type="text"
									name="firstName"
									value={firstName}
									onChange={(e) =>
										setFirstName(e.target.value)
									}
								/>
							</label>

							<label>
								Last Name:
								<input
									type="text"
									name="lastName"
									value={lastName}
									onChange={(e) =>
										setLastName(e.target.value)
									}
								/>
							</label>

							<label>
								Username:
								<input
									type="text"
									name="username"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
								/>
							</label>

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
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</label>

							<div className="welcome-buttons">
								<input type="submit" value="Signup" />
							</div>
							<h1>
								Already have an account?{" "}
								<Link to="/"> Login </Link>
							</h1>
						</form>
					</div>

					<div className="welcome-image" />
				</div>
			</div>
		</>
	);
}
