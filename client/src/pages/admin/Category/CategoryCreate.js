import React, { useState, useEffect } from "react";
import AdminNav from "../../../myComponent/nav/AdminNav";
import { toast } from "react-toastify";
import Jumbtron from "../../../myComponent/cards/Jumbotron";

import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

//access redix store
import { useSelector } from "react-redux";
import {
	createCategory,
	getCategories,
	removeCategory,
} from "../../../functions/category";
import "./CategoryDesign.css";

import CategoryForm from "../../../myComponent/forms/CategoryForm";
import LocalSearch from "../../../myComponent/forms/LocalSearch";
const CategoryCreate = () => {
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	const [categories, setCategories] = useState([]);

	//step 1:
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = () => {
		getCategories()
			.then((c) => {
				setCategories(c.data);
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
		createCategory({ name }, user.token)
			.then((res) => {
				setLoading(false);
				setName("");
				toast.success();

				toast.success(`${res.data.name} is created`, {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				loadCategories();
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
			removeCategory(slug, user.token)
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
					// toast.error( )
					loadCategories();
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
						"Add new Category",
						`Number of Categories: ${categories.length}`,
						"Search Category",
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
							<h4>Create Category</h4>
						)}
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

						{categories.filter(Searched(keyword)).map((e) => (
							<div
								className="alert alert-primary box"
								key={e._id}>
								{e.name}
								<span
									onClick={() =>
										handleRemove(e.slug)
									}
									className="btn btn-sm float-right">
									<DeleteOutlined className="text-danger" />
								</span>
								<Link to={`/admin/category/${e.slug}`}>
									<span className="btn btn-sm float-right">
										<EditOutlined className="text-warning" />
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

export default CategoryCreate;
