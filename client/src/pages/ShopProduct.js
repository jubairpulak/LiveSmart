import React, { useState, useEffect } from "react";
import Jumbtron from "../myComponent/cards/Jumbotron";

import { getProductsByCount, fetchProductbyFilter } from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../myComponent/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import { Empty } from "antd";

import {
	DollarCircleOutlined,
	DownSquareOutlined,
	StarOutlined,
} from "@ant-design/icons";
import { Wave } from "react-animated-text";
import Divider from "@material-ui/core/Divider";

// import Checkbox from "antd/lib/checkbox/Checkbox";
import StarRat from "../myComponent/forms/StarRat";
import "./shop.css";
const { SubMenu, ItemGroup } = Menu;

const ShopProduct = () => {
	const [products, setProducts] = useState([]);

	const [loading, setLoading] = useState(false);
	const [price, setPrice] = useState([0, 0]);
	const [okay, setOkay] = useState(false);
	const [category, setCategory] = useState([]);
	const [catId, setCatIds] = useState([]);
	const [sub, setSub] = useState([]);
	const [singlesub, setSinglesub] = useState("");
	let dispatch = useDispatch();
	let { search } = useSelector((state) => ({ ...state }));
	const { text } = search;
	const [star, SetStar] = useState("");
	const [brand, setBrand] = useState([
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
	]);
	const [colors, setColors] = useState([
		"Black",
		"Brown",
		"Silver",
		"White",
		"Blue",
		"Red",
		"RGB",
	]);

	const [shipping, SetShipping] = useState("");

	const [singlebrand, SetSingleBrand] = useState("");
	const [singlecolor, setSignleColor] = useState("");
	useEffect(() => {
		loadAllProduct();
		getCategories().then((res) => setCategory(res.data));
		getSubs().then((res) => setSub(res.data));
	}, []);

	const loadAllProduct = () => {
		getProductsByCount().then((p) => {
			setProducts(p.data);
			setLoading(false);
		});
	};

	const playloading = () => {};

	useEffect(() => {
		const delay = setTimeout(() => {
			fetchProducts({ query: text });
		}, 400);
		return () => clearTimeout(delay);
	}, [text]);

	const fetchProducts = (argment) => {
		fetchProductbyFilter(argment).then((res) => {
			setProducts(res.data);
		});
	};

	useEffect(() => {
		console.log("Ok to request");
		fetchProducts({ price });
	}, [okay]);

	const handleSlider = (val) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice(val);
		setCatIds([]);
		setTimeout(() => {
			setOkay(!okay);
		}, 400);
	};

	const handleCheck = (elem) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		SetSingleBrand("");
		setPrice([0, 0]);
		setSignleColor("");
		setSinglesub("");
		SetShipping("");

		let intThisStat = [...catId];
		let JustChck = elem.target.value;
		let foundINTheState = intThisStat.indexOf(JustChck);

		if (foundINTheState === -1) {
			intThisStat.push(JustChck);
		} else {
			intThisStat.splice(foundINTheState, 1);
		}
		setCatIds(intThisStat);
		fetchProducts({ category: intThisStat });
	};

	const showCategories = () =>
		category.map((c) => (
			<div key={c._id}>
				<Checkbox
					className="pb-2 pl-4 pr-4"
					value={c._id}
					name="category"
					onChange={handleCheck}
					checked={catId.includes(c._id)}>
					{c.name}
				</Checkbox>
				<br />
			</div>
		));
	const handleStarClick = (num) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});

		setPrice([0, 0]);
		setCatIds([]);
		SetShipping("");
		setSignleColor("");
		SetStar(num);
		setSinglesub("");
		SetSingleBrand("");
		fetchProducts({ stars: num });
	};

	const showStarRat = () => (
		<div className="pr-4 pl-4 pb-2">
			<StarRat starClick={handleStarClick} numberofStars={5} />
			<StarRat starClick={handleStarClick} numberofStars={4} />
			<StarRat starClick={handleStarClick} numberofStars={3} />
			<StarRat starClick={handleStarClick} numberofStars={2} />
			<StarRat starClick={handleStarClick} numberofStars={1} />
		</div>
	);

	const handleSub = (sub) => {
		setSinglesub(sub);
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setCatIds([]);
		setSignleColor("");
		SetShipping("");
		SetSingleBrand("");
		SetStar("");
		fetchProducts({ sub: singlesub });
	};
	const showSubcat = () =>
		sub.map((S) => (
			<div
				key={S._id}
				className=" p-1 m-1 badge badge-secondary"
				style={{ cursor: "pointer" }}
				onClick={() => handleSub(S)}>
				{S.name}
			</div>
		));

	const handleBrand = (e) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setCatIds([]);
		SetStar("");
		SetShipping("");
		setSinglesub("");
		setSignleColor("");
		SetSingleBrand(e.target.value);
		fetchProducts({ brand: e.target.value });
	};

	const showBrand = () =>
		brand.map((bnd) => (
			// <Radio
			// 	key={bnd}
			// 	value={bnd}
			// 	name={bnd}
			// 	checked={bnd === singlebrand}
			// 	onChange={handleBrand}
			// 	className="pb-1 pl-4 pr-4">
			// 	{bnd}
			// </Radio>
			<Checkbox
				className="pb-2 pl-4 pr-4"
				key={bnd}
				value={bnd}
				name={bnd}
				onChange={handleBrand}
				checked={bnd === singlebrand}>
				{bnd}
			</Checkbox>
		));

	const handleColor = (e) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setCatIds([]);
		SetStar("");
		setSinglesub("");
		SetShipping("");
		SetSingleBrand("");
		setSignleColor(e.target.value);
		fetchProducts({ color: e.target.value });
	};

	const showColors = () =>
		colors.map((c) => (
			<Radio
				key={c}
				value={c}
				name={c}
				checked={c === singlecolor}
				onChange={handleColor}
				className="pb-1 pl-4 pr-4">
				{c}
			</Radio>
		));

	const showShipping = () => (
		<>
			<Checkbox
				className="pb-2 pl-4 pr-4"
				onChange={handleShippingChange}
				value="Yes"
				checked={shipping === "Yes"}>
				Yes
			</Checkbox>
			<Checkbox
				className="pb-2 pl-4 pr-4"
				onChange={handleShippingChange}
				value="No"
				checked={shipping === "No"}>
				No
			</Checkbox>
		</>
	);
	const handleShippingChange = (e) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setCatIds([]);
		SetStar("");
		setSinglesub("");
		SetSingleBrand("");
		setSignleColor("");
		SetShipping(e.target.value);
		fetchProducts({ shipping: e.target.value });
	};
	const timer = setTimeout(() => {
		// console.log("This will run after 1 second!");
		<Wave text="Loading DATA" effect="stretch" effectChange={2.2} />;
	}, 10000);

	//show all products
	return (
		<div className="container-fluid shop-container">
			<div className="row">
				<div className="col-md-3 pt-5 mt-5">
					<h4 className="text-center">Search/Filter</h4>
					<hr />
					<Menu defaultOpenKeys={["slider"]} mode="inline">
						<SubMenu
							key="slider"
							title={
								<span className="h6">
									<DollarCircleOutlined />
									Price(Tk)
								</span>
							}>
							<div>
								<Slider
									className="ml-4 mr-4"
									tipFormatter={(v) => `Tk${v}`}
									range
									value={price}
									onChange={handleSlider}
									max="15000"
								/>
							</div>
						</SubMenu>
						<Divider />

						{/* THis for category */}
						<SubMenu
							key="category"
							title={
								<span className="h6">
									<DownSquareOutlined />
									Categories
								</span>
							}>
							<div style={{ marginTop: "-10px" }}>
								{showCategories()}
							</div>
						</SubMenu>
						<Divider />
						{/* THis for Star */}
						<SubMenu
							key="star"
							title={
								<span className="h6">
									<StarOutlined />
									Ratings
								</span>
							}>
							<div style={{ marginTop: "-10px" }}>
								{showStarRat()}
							</div>
						</SubMenu>
						<Divider />
						{/* THis for Sub Category */}
						<SubMenu
							key="Subs"
							title={
								<span className="h6">
									<StarOutlined />
									Sub Categories
								</span>
							}>
							<div
								style={{ marginTop: "-10px" }}
								className="pl-4 pr-4">
								{showSubcat()}
							</div>
						</SubMenu>
						<Divider />
						{/* THis for Brands */}
						<SubMenu
							key="Brands"
							title={
								<span className="h6">
									<DownSquareOutlined />
									Brands
								</span>
							}>
							<div
								style={{ marginTop: "-10px" }}
								className="pr-10">
								{showBrand()}
							</div>
						</SubMenu>
						<Divider />

						<Divider />

						<Divider />
					</Menu>
				</div>
				<div className="col-md-9 pt-2 pl-5">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<div className="jumbotron h1 font-wight-bold  text-center  mb-0 text-primary">
							<Jumbtron
								text={[
									"All Products!",
									"Search Products!",
								]}
							/>
						</div>
					)}
					{products.length < 1 && (
						<h1 className="text-center p-5">
							<Empty />
						</h1>
					)}

					<div className="row pb-5">
						{products.map((p) => (
							<div key={p._id} className="col-md-4 mt-3">
								<ProductCard product={p} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopProduct;
