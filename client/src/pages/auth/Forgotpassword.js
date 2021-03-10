import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";

import { toast } from "react-toastify";
import { Wave } from "react-animated-text";

import { useSelector } from "react-redux";

const Forgotpassword = ({ history }) => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const config = {
			url: process.env.React_APP_FORGOT_PASSWORD_REDIRECT,
			handleCodeInApp: true,
		};
		await auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				setEmail("");
				setLoading(false);
				toast.success("Check Your email for password reset Link");
			})
			.catch((error) => {
				setLoading(false);
				toast.error(error.message);
				console.log("Error message : ", error);
			});
	};

	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	//const [password, setPassword] = useState('')

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) {
			history.push("/");
		}
	}, [user]);

	return (
		<div
			className="container col-md-6 offset-md-3 p-5 mt-5"
			style={{ marginTop: "200px" }}>
			{loading ? (
				<h4>
					<Wave
						text="LOADING DATA"
						effect="stretch"
						effectChange={2.2}
					/>{" "}
				</h4>
			) : (
				<h4>Forgot Password </h4>
			)}

			<form onSubmit={handleSubmit}>
				<input
					type="email"
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Type your email"
					autoFocus
				/>
				<br />
				<button className="btn btn-raised" disabled={!email}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Forgotpassword;
