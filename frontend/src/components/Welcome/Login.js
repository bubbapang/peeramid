import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { clearSessionErrors } from "../../store/sessionErrors";
import "./Login.css";

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
		readableErrors = readableErrors.map((error) => {
			let errorType = error[0];
			let errorMessage = error[1];
			errorType = errorType[0].toUpperCase() + errorType.slice(1);
			errorType = errorType.replace(/_/g, " ");
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
		<div className="form-container login-form">
			<h2>Login Form</h2>

			{readableErrors &&
				readableErrors.map((error, idx) => (
					<div key={idx} className="error-message">
						{error}
					</div>
				))}

			<form onSubmit={handleSubmit}>
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
				<div className="login-buttons">
					<input type="submit" value="Login" />
					<input type="submit" value="Demo" onClick={handleDemo} />
				</div>
			</form>
		</div>
	);
}
