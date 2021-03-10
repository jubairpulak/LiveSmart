import React, { useState, useEffect } from "react";
import AdminNav from "../../../myComponent/nav/AdminNav";
import { toast } from "react-toastify";

//access redix store
import { useSelector } from "react-redux";
import Jumbtron from "../../../myComponent/cards/Jumbotron";

import { getSub, updateSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";

import CategoryForm from "../../../myComponent/forms/CategoryForm";

const SubUpdate = ({ match, history }) => {
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	const [categories, setCategories] = useState([]);

	const [parent, SetParent] = useState("");

	useEffect(() => {
		loadCategories();
		loadSub();
	}, []);

	const loadCategories = () => {
		getCategories()
			.then((c) => {
				setCategories(c.data);
				console.log(c.data);
			})
			.catch();
	};

	const loadSub = () =>
		getSub(match.params.slug).then((s) => {
			setName(s.data.sub.name);
			SetParent(s.data.sub.parent);
		});

	//take out object and store into user
	const { user } = useSelector((state) => ({ ...state }));

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		//console.log(name)
		updateSub(match.params.slug, { name, parent }, user.token)
			.then((res) => {
				setLoading(false);
				setName("");
				//toast.success( )

				toast.success(`${res.data.name} is update`, {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				history.push("/admin/sub");
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
				<Jumbtron
					text={[
						"New Products",
						"New Arival Products",
						"Best Sellers",
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
							<h4>Update Sub Category</h4>
						)}

						<div className="form-group">
							<label> Parent Category </label>
							<select
								name="category"
								className="form-control"
								onChange={(e) =>
									SetParent(e.target.value)
								}>
								<option>Please Select</option>
								{categories.length > 0 &&
									categories.map((c) => (
										<option
											key={c._id}
											value={c._id}
											selected={
												c._id === parent
											}>
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
					</div>
				</div>
			</div>
		</>
	);
};

export default SubUpdate;
