import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

//access redix store
import { useSelector } from "react-redux";
import AdminNav from "../../../myComponent/nav/AdminNav";
import Jumbtron from "../../../myComponent/cards/Jumbotron";

import FileUpload from "../../../myComponent/forms/FileUpload";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../myComponent/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";

const initialStep = {
	title: "",
	description: "",
	price: "",
	categories: [],
	category: "",
	subs: [],
	shippings: ["Yes", "No"],
	quantity: "",
	images: [],
	colors: ["Black", "Brown", "Silver", "White", "Blue", "Red", "RGB"],
	brands: [
		"First alert",
		"Zcombo",
		"Google",
		"Filtrete",
		"Hisense",
		"Samsung",
		"TCL",
		"Kasa",
		"Lutron",
		"Govee",
		"Lumimam",
		"Philips",
		"Blink Home",
		"Wyze",
		"Wuze",
		"Ring",
		"Sony",
		"Amazon",
		"Wemo",
		"Genie",
		"MyQ",
		"Kwikset",
		"Schlage",
		
	],
	shipping: "Yes",
	color: "",
	brand: "",
};

const ProductCreate = () => {
	const [values, setValues] = useState(initialStep);
	const [subOptions, setSubOptions] = useState([]);
	const [showSub, setShowSub] = useState(false);
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = () => {
		getCategories()
			.then((c) => {
				setValues({ ...values, categories: c.data });
				console.log(c.data);
			})
			.catch();
	};
	//destructure:
	//const {title,description, price, category, categories, subs, shippings,shipping, quantity, images, colors,brands, color, brand } = values

	const handleSubmit = (e) => {
		e.preventDefault();
		createProduct(values, user.token)
			.then((res) => {
				console.log(res);
				window.alert(`${res.data.title} is Created`);
				window.location.reload();
			})
			.catch((err) => {
				//if(err.response.status === 400) toast.error(err.response.data)
				toast.error(err.response.data.err);
				console.log(err.response.data.err);

				console.log(err);
			});
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleCategoryCHange = (e) => {
		e.preventDefault();
		console.log("CLicked Category", e.target.value);
		setValues({ ...values, subs: [], category: e.target.value });
		getCategorySubs(e.target.value).then((res) => {
			setSubOptions(res.data);
			console.log("Sub Options on Category Click :", res.data);
		});
		setShowSub(true);
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
					<div className="col-md-10 card">
						<h4 className="card-header info-color white-text text-center py-4">
							{loading ? (
								<LoadingOutlined className="text-danger h1" />
							) : (
								<strong>Product Create</strong>
							)}
						</h4>
						<hr />
						{/* {JSON.stringify(values.images)} */}
						<div className="p-3  ml-4">
							<FileUpload
								values={values}
								setValues={setValues}
								setLoading={setLoading}
							/>
						</div>

						<ProductCreateForm
							handleSubmit={handleSubmit}
							handleChange={handleChange}
							setValues={setValues}
							values={values}
							handleCategoryCHange={handleCategoryCHange}
							subOptions={subOptions}
							showSub={showSub}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductCreate;
