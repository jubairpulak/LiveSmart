import React, { useState, useEffect } from "react";
import AdminNav from "../../../myComponent/nav/AdminNav";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

//access redix store
import { useSelector } from "react-redux";
import Jumbtron from "../../../myComponent/cards/Jumbotron";

import { createSub, getSub, removeSub, getSubs } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";

import CategoryForm from "../../../myComponent/forms/CategoryForm";
import LocalSearch from "../../../myComponent/forms/LocalSearch";

const SubCreate = () => {
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	const [categories, setCategories] = useState([]);
	const [subs, setSubs] = useState([]);
	const [category, setCategory] = useState("");

	//step 1:
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		loadCategories();
		loadSubs();
	}, []);

	const loadCategories = () => {
		getCategories()
			.then((c) => {
				setCategories(c.data);
				console.log(c.data);
			})
			.catch();
	};

	const loadSubs = () => {
		getSubs()
			.then((c) => {
				setSubs(c.data);
				console.log(c.data);
			})
			.catch();
	};

	//take out object and store into user
	const { user } = useSelector((state) => ({ ...state }));

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		//console.log(name)
		createSub({ name, parent: category }, user.token)
			.then((res) => {
				setLoading(false);
				setName("");
				//toast.success( )

				toast.success(`${res.data.name} is created`, {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				loadSubs();
			})
			.catch((err) => {
				console.log(false);
				setLoading(false);
				if (err.response.status === 400)
					toast.error(err.response.data);
			});
	};

	const handleRemove = async (slug) => {
		if (window.confirm("Delete ?")) {
			setLoading(true);
			removeSub(slug, user.token)
				.then((res) => {
					setLoading(false);
					toast.error(`${res.data.name} is deleted`, {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					loadSubs();
				})
				.catch((err) => {
					console.log(err.response.status);
					setLoading(false);
					//
					if (err.response.status === 400) {
						toast.error(err.response.data);
					}
				});
		}
	};

	const Searched = (keyword) => (c) =>
		c.name.toLowerCase().includes(keyword);

	return (
		<>
			<div className="jumbotron h1 font-wight-bold  text-center  mb-0 text-primary ">
				<Jumbtron
					text={[
						"Sub Categories",
						`Number of Sub Category : ${subs.length}`,
						`Number of Categories : ${categories.length}`,
					]}
				/>
			</div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-2">
						<AdminNav />
					</div>
					<div className="col">
						{loading ? (
							<h4 className="text-danger">Loading..</h4>
						) : (
							<h4>Create Sub Category</h4>
						)}

						<div className="form-group">
							<label> Parent Category </label>
							<select
								name="category"
								className="form-control"
								onChange={(e) =>
									setCategory(e.target.value)
								}>
								<option>Please Select</option>
								{categories.length > 0 &&
									categories.map((c) => (
										<option
											key={c._id}
											value={c._id}>
											{c.name}
										</option>
									))}
							</select>
						</div>

						<CategoryForm
							handleSubmit={handleSubmit}
							name={name}
							setName={setName}
						/>

						{/* step 2*/}
						<LocalSearch
							keyword={keyword}
							setKeyword={setKeyword}
						/>

						{subs.filter(Searched(keyword)).map((s) => (
							<div
								className="alert alert-primary"
								key={s._id}>
								{s.name}{" "}
								<span
									onClick={() =>
										handleRemove(s.slug)
									}
									className="btn btn-sm float-right">
									<DeleteOutlined className="text-danger" />
								</span>{" "}
								<Link to={`/admin/sub/${s.slug}`}>
									<span className="btn btn-sm float-right">
										<EditOutlined className="text-warning" />{" "}
									</span>
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default SubCreate;
