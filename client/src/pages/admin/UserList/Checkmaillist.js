import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import AdminNav from "../../../myComponent/nav/AdminNav";
import Jumbtron from "../../../myComponent/cards/Jumbotron";
import { toast } from "react-toastify";
import { Pagination } from "antd";

import { useSelector } from "react-redux";
import {
	getallmails,
	updatedata,
	getmailByCount,
	updateinfo,
} from "../../../functions/admin";
import moment from "moment";
import { Descriptions } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Table } from "react-bootstrap";
const Checkmaillist = () => {
	const [feedbacklist, setFeedbacklist] = useState([]);
	const [docheck, setDoCheck] = useState(0);
	const [feedbackdata, setFeedbackdata] = useState("");
	const [sendername, setSendername] = useState("");
	const [sendreply, setSendreply] = useState("No");
	const [senderemail, setSenderemail] = useState("");

	const [mailCount, setMailcount] = useState(0);
	const [page, setPage] = useState(1);
	// const [check, setCheck] = useState(0);

	const { user } = useSelector((state) => ({ ...state }));
	useEffect(() => {
		loadallmails();
	}, [page, sendreply]);

	useEffect(() => {
		getmailByCount().then((res) => setMailcount(res.data));
	}, []);
	const handleclick = (email, check, message, name) => {
		updatedata(email, user.token)
			.then((res) => {
				console.log("Update data");
				setDoCheck(1);
				setSenderemail(email);
				setSendername(name);
				setFeedbackdata(message);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const sendEmail = (e) => {
		e.preventDefault();
		updateinfo(senderemail, "Yes", user.token)
			.then((res) => {
				setSendreply("Yes");
			})
			.catch((err) => {
				console.log(err);
			});

		emailjs
			.sendForm(
				"service_dxjhpmy",
				"template_1wc5k62",
				e.target,
				"user_xYHMwMgkT29WAACMVkGz2"
			)
			.then(
				(result) => {
					console.log(result.text);
					toast.success("Email Has been sent to user");
				},
				(error) => {
					console.log(error.text);
				}
			);
		e.target.reset();
	};
	const loadallmails = () => {
		getallmails(user.email, user.token, "createdAt", "desc", page)
			.then((res) => {
				console.log("Data found");
				setFeedbacklist(res.data);
				// setUserlist(res.data.getuserlist);
				// setAdminlist(res.data.getAdminList);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<>
			<div className="jumbotron h1 font-wight-bold  text-center  mb-0 text-primary ">
				<Jumbtron
					text={[
						`Feedback Information`,
						`Number of Feedback : ${feedbacklist.length}`,
					]}
				/>
			</div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-2">
						<AdminNav />
					</div>

					<div className="col-md-10  p-0 ">
						<hr />

						<hr />
						<h4 className="text-center">
							Feedback List From Customers
						</h4>
						<hr />
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Name</th>
									<th>Sender Email</th>
									<th>Feedbace</th>
									<th>Date</th>
									<th>Replied?</th>
									<th>Check it?</th>
								</tr>
							</thead>
							<tbody>
								{feedbacklist.map(
									(
										{
											name,
											email,
											createdAt,
											replied,
											message,
											check,
										},
										i
									) => (
										<tr key={i}>
											<td>{name}</td>
											<td>{email}</td>
											<td>
												{message.substring(
													0,
													15
												)}
												......
											</td>
											<td>
												{moment(
													createdAt
												).format(
													"MMMM Do YYYY"
												)}
											</td>
											<td>{replied}</td>
											<td>
												<button
													className="btn btn-outline"
													onClick={() =>
														handleclick(
															email,
															check,
															message,
															name
														)
													}>
													Read It?
												</button>
											</td>
										</tr>
									)
								)}
							</tbody>
						</Table>

						<div className="row">
							<nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
								<Pagination
									current={page}
									total={(mailCount / 5) * 10}
									onChange={(value) =>
										setPage(value)
									}
								/>
							</nav>
						</div>
						<div className="container card">
							<div className="row">
								<div className="col-md-10 p-5">
									<Descriptions title="Feedback Details ">
										<Descriptions.Item label="Customer Name">
											<b>{sendername}</b>
										</Descriptions.Item>
										<Descriptions.Item label="Email">
											{senderemail}
										</Descriptions.Item>
										<br />
										<Descriptions.Item label="Feedback Message">
											<b>{feedbackdata}</b>
										</Descriptions.Item>
									</Descriptions>
								</div>
							</div>
						</div>
						<div className="container card mt-2 p-3">
							<form onSubmit={sendEmail}>
								<h4 className="login-text-desgin text-center text-capitalize">
									Send Mail To User
								</h4>

								<div className="row pt-5 mx-auto">
									<div className="col-md-8 form-group mx-auto">
										<input
											type="text"
											className="form-control"
											placeholder="Name"
											name="name"
											value="LiveSmart Admin"
										/>
									</div>
									<div className="col-md-8 form-group pt-2 mx-auto">
										<input
											type="email"
											className="form-control"
											placeholder="Enter Email"
											value={senderemail}
											name="email"
										/>
									</div>
									<div className="col-md-8 form-group pt-2 mx-auto">
										<input
											type="text"
											className="form-control"
											placeholder="Subject"
											name="Subject"
										/>
									</div>
									<div className="col-md-8 form-group pt-2 mx-auto">
										<textarea
											className="form-control"
											id=""
											cols="30"
											rows="8"
											name="message"></textarea>
									</div>
									<div className="col-md-8 pt-3 mx-auto">
										<input
											type="submit"
											className="btn btn-lg btn-info"
											value="Send Mail"
										/>
									</div>
								</div>
							</form>
						</div>

						<br />
						<br />
					</div>
				</div>
			</div>
		</>
	);
};

export default Checkmaillist;
