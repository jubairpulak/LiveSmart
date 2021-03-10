import React, { useState, useEffect } from "react";
import AdminNav from "../../../myComponent/nav/AdminNav";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

//access redix store
import { useSelector } from "react-redux";
import Jumbtron from "../../../myComponent/cards/Jumbotron";

import FileUpload from "../../../myComponent/forms/FileUpload";
import { getProduct, updateProduct } from "../../../functions/product";
import ProductUpdateForm from "../../../myComponent/forms/ProductUpdateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";

const initialStep = {
	title: "",
	description: "",
	price: "",

	category: "",
	subs: [],
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
	shipping: "",
	color: "",
	brand: "",
};

const ProductUpdate = ({ match, history }) => {
	const [values, setValues] = useState(initialStep);
	const [subOptions, setSubOptions] = useState([]);
	const [categories, setCategories] = useState([]);
	const [arrayOfSubs, setArrayOfSubs] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => ({
		...state,
	}));
	const { slug } = match.params;

	useEffect(() => {
		loadProduct();
		loadCategories();
	}, []);

	const loadProduct = () => {
		getProduct(slug).then((p) => {
			setValues({
				...values,
				...p.data.Product,
			});

			getCategorySubs(p.data.Product.category._id).then((res) => {
				setSubOptions(res.data);
			});
			let arr = [];
			p.data.Product.subs.map((s) => {
				arr.push(s._id);
			});
			setArrayOfSubs((prev) => arr);
		});
	};

	const loadCategories = () => {
		getCategories()
			.then((c) => {
				setCategories(c.data);
				console.log(c.data);
			})
			.catch();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		values.subs = arrayOfSubs;
		values.category = selectedCategory
			? selectedCategory
			: values.category;
		updateProduct(slug, values, user.token)
			.then((res) => {
				setLoading(false);
				toast.success(`${res.data.title} is Updated`);
				history.push("/admin/products");
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.err);
			});
	};

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const handleCategoryChange = (e) => {
		e.preventDefault();
		console.log("CLicked Category", e.target.value);
		setValues({ ...values, subs: [] });

		setSelectedCategory(e.target.value);
		getCategorySubs(e.target.value).then((res) => {
			setSubOptions(res.data);
			console.log("Sub Options on Category Click :", res.data);
		});

		console.log("Existing Category : ", values.category);

		//back to the previous category
		if (values.category._id === e.target.value) {
			loadProduct();
		}

		setArrayOfSubs([]);
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
					<div className="col-md-10 ">
						<h4 className="card-header info-color white-text text-left py-4">
							{loading ? (
								<LoadingOutlined className="text-danger h1" />
							) : (
								<strong>Product Update</strong>
							)}
						</h4>
						<div className="p-3">
							<FileUpload
								values={values}
								setValues={setValues}
								setLoading={setLoading}
							/>
						</div>

						<ProductUpdateForm
							handleSubmit={handleSubmit}
							handleChange={handleChange}
							setValues={setValues}
							values={values}
							handleCategoryChange={handleCategoryChange}
							categories={categories}
							subOptions={subOptions}
							arrayOfSubs={arrayOfSubs}
							setArrayOfSubs={setArrayOfSubs}
							selectedCategory={selectedCategory}
						/>
						{/* {JSON.stringify(values)} */}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductUpdate;
