import React, { useState } from "react";

import { toast } from "react-toastify";

import UserNav from "../../myComponent/nav/UserNav";
import Jumbtron from "../../myComponent/cards/Jumbotron";

import { auth } from "../../firebase";

const Password = () => {
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setPassword("");
		//console.log(password)
		//gives us current log in user
		await auth.currentUser
			.updatePassword(password)
			.then(() => {
				// success message

				setLoading(false);
				toast.success("Password has been Updated");
			})
			.catch((err) => {
				//if not change:
				setLoading(false);
				toast.error(err.message);
			});

		//
	};

	// const pa
	const passwordupdateform = () => (
		<form onSubmit={handleSubmit} className=" p-5  mb-3 ml-4 mr-4 card">
			<div className="form-group">
				<label> New Password</label>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					className="form-control pwd"
					placeholder="Enter at least 6 character password"
					disabled={loading}
					value={password}
				/>
				<button
					className="btn btn-primary"
					disabled={!password || password.length < 6 || loading}>
					Submit
				</button>
			</div>
		</form>
	);
	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-2 pt-5 mt-5">
						<UserNav />
					</div>
					<div className="col">
						{loading ? (
							<h4 className="mt-5 pt-5">Loading... </h4>
						) : (
							<h4 className="mt-5 pt-5 text-center">
								{" "}
								Password Update
								<hr />
							</h4>
						)}

						{passwordupdateform()}
					</div>
				</div>
			</div>
		</>
	);
};

export default Password;
