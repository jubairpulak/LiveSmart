import React, { useState, useEffect } from "react";
import AdminNav from "../../../myComponent/nav/AdminNav";
import Jumbtron from "../../../myComponent/cards/Jumbotron";
import { Pagination } from "antd";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
	getAllUsers,
	UpdateUsertToAdmin,
	getUserCount,
} from "../../../functions/admin";
import { Table } from "react-bootstrap";
const GetUserList = () => {
	const [userlist, setUserlist] = useState([]);
	const [adminlist, setAdminlist] = useState([]);
	const [check, setCheck] = useState(0);
	const [usercount, setUsercount] = useState(0);
	const [page, setPage] = useState(1);
	const { user } = useSelector((state) => ({ ...state }));
	useEffect(() => {
		loadallorders();
	}, [page, check]);

	useEffect(() => {
		getUserCount().then((res) => setUsercount(res.data));
	}, []);

	const handleclick = (email, name) => {
		setCheck(check + 1);
		UpdateUsertToAdmin(email, user.token)
			.then((res) => {
				toast.success(`${name} has updated as Admin`);
			})
			.catch((err) => {
				console.log(err);
			});
		loadallorders();
	};

	const loadallorders = () => {
		getAllUsers(user.email, "createdAt", "desc", page, user.token)
			.then((res) => {
				console.log("Data found");
				console.log(res.data);
				setUserlist(res.data.getuserlist);
				setAdminlist(res.data.getAdminList);
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
						`Total Account : ${usercount}`,
						,
						`Number of Admin : ${adminlist.length}`,
						,
						`Number of Users : ${
							usercount - adminlist.length
						}`,
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
						<h3 className="text-center">Admin List</h3>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Role</th>
								</tr>
							</thead>
							<tbody>
								{adminlist.map(
									({ name, email, role }, i) => (
										<tr key={i}>
											<td>{name}</td>
											<td>{email}</td>
											<td>{role}</td>
										</tr>
									)
								)}
							</tbody>
						</Table>
						<hr />
						<h4 className="text-center">User List</h4>
						<hr />
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Role</th>
									<th>Make Admin?</th>
								</tr>
							</thead>
							<tbody>
								{userlist.map(
									({ name, email, role }, i) => (
										<tr key={i}>
											<td>{name}</td>
											<td>{email}</td>
											<td>{role}</td>
											<td>
												<button
													className="btn btn-outline"
													onClick={() =>
														handleclick(
															email,
															name
														)
													}>
													Click Here
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
									total={(usercount / 2) * 10}
									onChange={(value) =>
										setPage(value)
									}
								/>
							</nav>
						</div>

						<br />
						<br />
					</div>
				</div>
			</div>
		</>
	);
};

export default GetUserList;
