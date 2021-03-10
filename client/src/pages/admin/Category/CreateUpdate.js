import React, { useState, useEffect } from "react";
import AdminNav from "../../../myComponent/nav/AdminNav";
import { toast } from "react-toastify";
import Jumbtron from "../../../myComponent/cards/Jumbotron";

//access redix store
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../../myComponent/forms/CategoryForm";

const CategoryUpdate = ({ history, match }) => {
	//take out object and store into user
	const { user } = useSelector((state) => ({ ...state }));

	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadCategory();
	}, []);

	const loadCategory = () => {
		getCategory(match.params.slug)
			.then((c) => {
				setName(c.data.category.name);
				console.log(c.data.category.name);
			})
			.catch();
	};

	//01991972811

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		//console.log(name)
		updateCategory(match.params.slug, { name }, user.token)
			.then((res) => {
				setLoading(false);
				setName("");
				toast.success();

				toast.success(`${res.data.name} is Updated`, {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				history.push("/admin/category");
			})
			.catch((err) => {
				console.log(false);
				setLoading(false);
				if (err.response.status === 400)
					toast.error(err.response.data);
			});
	};

	return (
		<>
			<div className="jumbotron h1 font-wight-bold  text-center  mb-0 text-primary ">
				<Jumbtron text={["Update Category"]} />
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
							<h4>Update Category</h4>
						)}
						<CategoryForm
							handleSubmit={handleSubmit}
							name={name}
							setName={setName}
						/>

						<hr />
					</div>
				</div>
			</div>
		</>
	);
};

export default CategoryUpdate;
