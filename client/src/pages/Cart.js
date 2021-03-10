import React, { useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { Select } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { Popover, Button } from "antd";

import { Link } from "react-router-dom";
import Jumbtron from "../myComponent/cards/Jumbotron";
import { usercrt } from "../functions/user";
import ProductCartCheckOut from "../myComponent/cards/ProductCartCheckOut";
import { Cascader } from "antd";

import "./cart-page.css";
import EachProductCartDesgn from "./../myComponent/cards/EachProductCartDesign";
const Cart = ({ history }) => {
	const { Option } = Select;
	const { cart, user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	const [location, setLocation] = useState("");
	const [deliveryCharge, setDeliveryCharge] = useState(0);
	const [phonenumber, setPhonenumber] = useState("");

	// let username, email;
	// console.log("User Stored : ", stored);

	// console.log("User name : ", username);

	useEffect(() => {
		// loadSingleProduct();
		getTotalPrice();
		// onChange();
	}, [location]);

	const options = [
		{
			value: "Dhaka",
			label: "Dhaka",
			children: [
				{
					value: "south",
					label: "south",
					children: [
						{
							value: "Dhanmondi 1",
							label: "Dhanmondi 1",
						},
						{
							value: "Dhanmondi 2",
							label: "Dhanmondi 2",
						},
						{
							value: "Dhanmondi 3",
							label: "Dhanmondi 3",
						},
						{
							value: "Dhanmondi 10",
							label: "Dhanmondi 10",
						},
						{
							value: "Dhanmondi 11",
							label: "Dhanmondi 11",
						},
						{
							value: "Abul hasnat Road ",
							label: "Abul hasnat Road",
						},
						{
							value: "Banasree",
							label: "Banasree",
						},
						{
							value: "Bangabhaban",
							label: "Banghaban",
						},
						{
							value: "Chawk Bazar",
							label: "Chawk Bazar",
						},
						{
							value: "Chankharpul lane",
							label: "Chankharpul lane",
						},
					],
				},
				{
					value: "North",
					label: "North",
					children: [
						{
							value: "Bashundhara",
							label: "Bashundhara R/A",
						},
						{
							value: "Adabor",
							label: "Adabor",
						},
						{
							value: "Adarsha Bag",
							label: "Adarsha",
						},
						{
							value: "Aftab nagar",
							label: "Aftab nagar",
						},
						{
							value: "Ajompur",
							label: "Ajompur",
						},
						{
							value: "Armanitola",
							label: "Armanitola",
						},
						{
							value: "Army Stadium",
							label: "Army Stadium",
						},
						{
							value: "Asad Gate",
							label: "Asad Gate",
						},
						{
							value: "Badda",
							label: "Badda",
						},
						{
							value: "Baily Road",
							label: "Baily Road",
						},
					],
				},
			],
		},
	];

	const displayRender = (label) => {
		return label[label.length - 1];
	};

	const onChange = (val) => {
		let value = val[2];
		if (val[2]) {
			value = val[2];
		} else {
			value = "Dhanmondi 1";
		}
		// console.log("onchnge value:", value[2]);
		setLocation(value);

		if (value === "Dhanmondi 1") {
			setDeliveryCharge(65);
			console.log("dc 65 tk");
		} else if (value === "Dhanmondi 2") {
			setDeliveryCharge(75);
			console.log("dc 75 tk");
		} else if (value === "Dhanmondi 3") {
			setDeliveryCharge(85);
			console.log("dc 85 tk");
		} else if (value === "Dhanmondi 10") {
			setDeliveryCharge(65);
			console.log("dc 85 tk");
		} else if (value === "Dhanmondi 11") {
			setDeliveryCharge(55);
			console.log("dc 85 tk");
		} else if (value === "Abul hasnat Road") {
			setDeliveryCharge(50);
		} else if (value === "Bashundhara") {
			setDeliveryCharge(65);
		} else if (value === "Adabor") {
			setDeliveryCharge(95);
		} else if (value === "Adarsha Bag") {
			setDeliveryCharge(100);
		} else if (value === "Aftab nagar") {
			setDeliveryCharge(85);
		} else if (value === "Ajompur") {
			setDeliveryCharge(50);
		} else if (value === "Badda") {
			setDeliveryCharge(60);
		} else {
			setDeliveryCharge(105);
			console.log();
		}

		// console.log(deliveryCharge);
	};
	// console.log(deliveryCharge);
	const getTotalPrice = (dc) => {
		// console.log(dc);
		const a = getprice();
		return dc + a;
	};

	const getprice = () => {
		return cart.reduce((present, future) => {
			return present + future.count * future.price;
		}, 0);
	};

	const proceedOrder = () => {
		// alert("Save Order to db");
		console.log("cart", JSON.stringify(cart, null, 4));
		usercrt(cart, deliveryCharge, location, phonenumber, user.token)
			.then((res) => {
				console.log("Cart post res", res);
				if (res.data.isokay) {
					history.push("./checkout");
				}
			})
			.catch((err) => console.log("Cart save err", err));
	};
	const proceedOrdertoCash = () => {
		// alert("Save Order to db");
		dispatch({
			type: "COD",
			payload: true,
		});
		// console.log("cart", JSON.stringify(cart, null, 4));
		usercrt(cart, deliveryCharge, location, phonenumber, user.token)
			.then((res) => {
				console.log("Cart post res", res);
				if (res.data.isokay) {
					history.push("./checkout");
				}
			})
			.catch((err) => console.log("Cart save err", err));
	};

	const showCart = () => (
		<>
			{/* <table className="table table-bordered">
				<thead className="thead-light">
					<tr>
						<th scope="col"> Image</th>
						<th scope="col"> Title</th>
						<th scope="col"> Price</th>
						<th scope="col"> Brand</th>
						<th scope="col"> Color</th>
						<th scope="col"> Count</th>
						<th scope="col"> Shipping</th>
						<th scope="col"> Cancel</th>
					</tr>
				</thead>
				{cart.map((product) => (
					<ProductCartCheckOut
						key={product._id}
						product={product}
					/>
				))}
			</table> */}
			{cart.map((product) => (
				<EachProductCartDesgn key={product._id} product={product} />
			))}
		</>
	);

	const content = (
		<div>
			{/* <Select
				showSearch
				style={{ width: 200 }}
				placeholder="Select Location"
				optionFilterProp="children"
				onChange={onChange}
				// onSearch={onSearch}
				filterOption={(input, option) =>
					option.children
						.toLowerCase()
						.indexOf(input.toLowerCase()) >= 0
				}>
				<Option value="Dhanmondi 1">Dhanmondi 1</Option>
				<Option value="Dhanmondi 2">Dhanmondi 2</Option>
				<Option value="Dhanmondi 3">Dhanmondi 3</Option>
			</Select> */}
		</div>
	);

	return (
		<div className="container">
			<div className="row full-body">
				{/* {JSON.stringify(cart)} */}
				{console.log("sfs")}
				<div className="col-md-12 jum-style">
					{/* <div className="jumbotron h1 font-wight-bold  text-center  mb-2 text-primary   ">
						{/* You Have Added {cart.length} Card Into Card List */}

					{/* <Jumbtron
							text={[
								"Your Cart Information...",
								`You Have Added ${cart.length} Product Into Cart List`,
							]}
						/> */}
					{/* </div> */}
				</div>

				<div className="col-md-8">
					<h4 className="display-3 text-center">
						Your Selected Cart
					</h4>
					{!cart.length ? (
						<h4 className="display-4">
							PLease, Continue{" "}
							<Link to="/shop">Shopping</Link>
						</h4>
					) : (
						showCart()
					)}
				</div>
				<div className="col-md-4 text-secondary left-design">
					<p>Delivery Location</p>
					<span className="d-flex">
						<h6>
							<GoLocation /> Dhaka, {location}
						</h6>

						<h3 className="text-left">
							{/* <Popover
								placement="bottomRight"
								content={content}
								title="Select Area">
								<Button type="primary">
									Change Location
								</Button>
							</Popover> */}
							<Cascader
								options={options}
								expandTrigger="hover"
								displayRender={displayRender}
								onChange={onChange}
								placeholder="Please select"
							/>
						</h3>
					</span>
					{/* //New Try */}
					<span className="d-flex ">
						<h6>
							<FiPhoneCall />
						</h6>

						<input
							type="text"
							className="from-design "
							style={{ marginLeft: "130px" }}
							value={phonenumber}
							maxLength="11"
							onChange={(e) =>
								setPhonenumber(e.target.value)
							}
							placeholder="Phone Number"
							autoFocus
						/>
					</span>
					{/* //New Try */}
					<h3> Order Details</h3>
					<hr />
					<h4>Products</h4>
					{cart.map((c, i) => (
						<div key={i}>
							<p>
								{c.title} x {c.count} = Tk.
								{c.price * c.count}
							</p>
						</div>
					))}
					Delivery Charge : TK.{deliveryCharge}
					<hr />
					Total Price : <b>TK.{getTotalPrice(deliveryCharge)}</b>
					<hr />
					{user ? (
						<>
							<button
								onClick={proceedOrder}
								className="btn btn-lg btn-primary mt-2"
								disabled={
									!cart.length ||
									phonenumber.length < 11
								}>
								Proceed To CheckOut
							</button>
							<br />
							<button
								onClick={proceedOrdertoCash}
								className="btn btn-lg btn-warning mt-2"
								disabled={
									!cart.length ||
									phonenumber.length < 11
								}>
								Pay Cash on Delivery
							</button>
						</>
					) : (
						<button className="btn btn-sm btn-primary mt-2">
							<Link
								to={{
									pathname: "/login",
									state: { from: "cart" },
								}}>
								LogIn to CheckOut
							</Link>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Cart;
