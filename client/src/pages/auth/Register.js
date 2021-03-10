import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";

import { toast } from "react-toastify";
import { Wave } from "react-animated-text";

import { useSelector } from "react-redux";

const Register = ({ history }) => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) {
			history.push("/");
		}
	}, [user]);

	const handleSubmit = async (e) => {
		setLoading(true);
		if (!email) {
			toast.error("Email field should not be empty");
			setTimeout(() => {
				setLoading(false);
			}, 3000);
		}
		e.preventDefault();
		const config = {
			url: process.env.React_APP_REGISTER_REDIRECT_URL,
			handleCodeInApp: true,
		};

		await auth.sendSignInLinkToEmail(email, config);
		toast.success(
			`Email is sent to ${email}. Click the link to complete your reg.`
		);

		//save user email in localstorage
		window.localStorage.setItem("emailForRegistration", email);
		//clear state

		setEmail("");
		setLoading(false);
	};
	const registrerForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					autoFocus
				/>

				<br />

				<button type="submit" className="btn btn-raised">
					Register
				</button>
			</form>
		);
	};

	return (
		<div className="container p-5" style={{ marginTop: "100px" }}>
			<div className="row">
				<div className="col-md-6 offset-md-3">
					{loading ? (
						<h4>
							<Wave
								text="LOADING DATA"
								effect="stretch"
								effectChange={2.2}
							/>{" "}
						</h4>
					) : (
						<h4 className="login-text-desgin">
							Registration Form
						</h4>
					)}

					{registrerForm()}
				</div>
			</div>
		</div>
	);
};

export default Register;
