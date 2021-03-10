import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { Wave } from "react-animated-text";
import { Form } from "react-bootstrap";

import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { sendFeedbackdata } from "../functions/user";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
const Contract = () => {
	const [feedbackdetails, setFeedbackdetails] = useState("");
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => ({ ...state }));

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(feedbackdetails);
		sendFeedbackdata(user.email, user.name, feedbackdetails, user.token)
			.then((res) => {
				console.log("Data found");
				toast.success("We will mail you very soon!");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const ContractFrom = () => (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					type="email"
					className="form-control"
					placeholder="Email"
					value="jubairpulak77@gmail.com"
					disabled
					hidden
				/>
				{/* {user.name} */}
			</div>

			<div className="form-group">
				<Form.Group controlId="exampleForm.ControlTextarea1">
					<Form.Label>Send Your Feedback/Queries</Form.Label>
					<Form.Control
						as="textarea"
						placeholder="Enter Queries"
						autoFocus
						value={feedbackdetails}
						rows={5}
						onChange={(e) =>
							setFeedbackdetails(e.target.value)
						}
					/>
				</Form.Group>
			</div>

			<br />

			<Button
				onClick={handleSubmit}
				type="primary"
				className=" btn mb-3"
				block
				shape="round"
				icon={<MailOutlined />}
				size="large">
				Send Feedback
			</Button>
		</form>
	);
	return (
		<div className="container p-5">
			<div className="row">
				<div
					className="col-md-6 bg-white offset-md-3"
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
						<h4 className="login-text-desgin">
							Contract Page
						</h4>
					)}
					{ContractFrom()}
				</div>
			</div>
		</div>
	);
};

export default Contract;
