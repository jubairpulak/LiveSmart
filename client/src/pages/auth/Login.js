import React, { useState, useEffect } from "react";
import { auth, googleauthprovider } from "../../firebase";

import { toast } from "react-toastify";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { Wave } from "react-animated-text";
import ReCAPTCHA from "react-google-recaptcha";

import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { createorupdateuser } from "../../functions/auth";

//roleBasedRedirect(res)
import "./login.css";

const Login = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [attempt, setAttempt] = useState(0);

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		let intended = history.location.state;

		if (intended) {
			return;
		} else {
			if (user && user.token) {
				history.push("/");
			}
		}
	}, [user, history]);

	let dispatch = useDispatch();
	const styles = {
		fontFamily: "sans-serif",
		textAlign: "center",
	};

	const onChange = (value) => {
		console.log("Captcha value:", value);
	};

	const roleBasedRedirect = (res) => {
		let intended = history.location.state;
		if (intended) {
			history.push(intended.from);
		} else {
			if (res.data.role === "admin") {
				history.push("/");
			} else {
				history.push("/");
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		//console.table(email , password)

		try {
			const result = await auth.signInWithEmailAndPassword(
				email,
				password
			);
			//console.log(result);

			const { user } = result;
			const idTokenResult = await user.getIdTokenResult();
			createorupdateuser(idTokenResult.token)
				.then((res) => {
					dispatch({
						type: "LOGGED_IN_USER",
						payload: {
							name: res.data.name,
							email: res.data.email,
							token: idTokenResult.token,
							role: res.data.role,
							_id: res.data._id,
						},
					});
					roleBasedRedirect(res);
					setAttempt(0);
				})
				.catch((err) => {
					// console.log(err);
					// setLoading("false");
				});

			// history.push('/')
		} catch (error) {
			setLoading(false);
			setAttempt(attempt + 1);
			console.log("attempt : ", attempt);
			console.log(error);
			toast.error(error.message);
		}
	};

	//google log in
	const googlelogin = async () => {
		auth.signInWithPopup(googleauthprovider)
			.then(async (result) => {
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();
				createorupdateuser(idTokenResult.token)
					.then((res) => {
						dispatch({
							type: "LOGGED_IN_USER",
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: idTokenResult.token,
								role: res.data.role,
								_id: res.data._id,
							},
						});
						roleBasedRedirect(res);
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
			});
	};

	const loginForm = () => (
		<form onSubmit={handleSubmit} className="p-3">
			<div className="form-group">
				<input
					type="email"
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					autoFocus
				/>
			</div>

			<div className="form-group">
				<input
					type="password"
					className="form-control"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Your password"
					autoFocus
				/>
			</div>

			<br />

			<Button
				onClick={handleSubmit}
				type="primary"
				className=" btn mb-3"
				block
				shape="round"
				icon={<MailOutlined />}
				size="large"
				disabled={!email || password.length < 6}>
				Login with Email & password
			</Button>
		</form>
	);

	return (
		<div className="container p-5 " style={{ marginTop: "100px" }}>
			<div className="row">
				<div
					className="col-md-6 bg-white   offset-md-3"
					style={styles}>
					{loading ? (
						<h4>
							<Wave
								text="LOADING DATA"
								effect="stretch"
								effectChange={2.2}
							/>{" "}
						</h4>
					) : (
						<h4 className="login-text-desgin text-capitalize">
							Sing In
						</h4>
					)}

					{loginForm()}
					<Button
						onClick={googlelogin}
						type="danger"
						className="mb-3"
						block
						shape="round"
						icon={<GoogleOutlined />}
						size="large">
						Login with Google
					</Button>

					<Link
						to="/forgot/password"
						className="float-right h3 btn text-danger">
						Forgot Password
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
