import React from "react";
import ModalImage from "react-modal-image";
import { Image } from "antd";
import { InputNumber } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";
// RiDeleteBinLine
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	CloseOutlined,
} from "@ant-design/icons";

import "./eachprod.css";

const EachProductCartDesgn = ({ product }) => {
	let Dispatch = useDispatch();
	const updatedetails = (elm, prodtype) => {
		let cart = [];
		if (typeof window !== "undefined") {
			if (localStorage.getItem("cart")) {
				cart = JSON.parse(localStorage.getItem("cart"));
			}
			if (prodtype === "color") {
				cart.map((prod, i) => {
					if (prod._id === product._id) {
						cart[i].color = elm.target.value;
					}
				});
			} else if (prodtype === "count") {
				let cont = elm;
				if (cont > product.quantity) {
					toast.error(
						`Maximum Quantity of this product : ${product.quantity}`
					);
					return;
				}

				cart.map((prod, i) => {
					if (prod._id === product._id) {
						cart[i].count = cont;
					}
				});
			} else if (prodtype === "remove") {
				cart.map((prod, i) => {
					if (prod._id === product._id) {
						cart.splice(i, 1);
					}
				});
				toast.error(`${product.title} has been removed`);
			}
			// console.log("update cart : ", cart)
			localStorage.setItem("cart", JSON.stringify(cart));
			Dispatch({
				type: "ADD_TO_CART",
				payload: cart,
			});
		}
	};

	const handleQuantity = (elm) => {
		let count = "count";
		updatedetails(elm, count);
		// console.log("Total COunt :", elm);
	};

	const hanldeRemove = (elm) => {
		// console.log(product._id, "to Remove");
		updatedetails(elm, "remove");
	};
	return (
		<>
			<div style={{ backgroundColor: "#FFFFFF" }}>
				<div
					style={{
						paddingLeft: "35px",
						paddingTop: "15px",
						paddingRight: "20px",
						paddingBottom: "0px",
					}}
					className="each-devider ">
					{/* {product.title} */}
					<div className="d-flex">
						<p>
							<Image
								width={80}
								src={product.images[0].url}
								style={{ cursor: "pointer" }}
							/>
						</p>
						<div className="pl-2">
							{" "}
							<Link
								className="main-name-style"
								to={`/product/${product.slug}`}>
								{product.title}
							</Link>
							<br />
							<span className="main-brand-style">
								{" "}
								Brand : {product.brand} <br />Color :{" "}
								{product.color}
							</span>
						</div>
						<div>
							<p className="d-flex cart-money-desgin justify-content-center ">
								<h5 className="cart-money-style">৳</h5>
								<h5 className="pl-2 cart-money-style">
									{product.price}
								</h5>
								<br />

								<p
									style={{
										marginTop: "90px",

										cursor: "pointer",
									}}>
									<RiDeleteBinLine
										size="19px"
										onClick={hanldeRemove}
									/>
								</p>
							</p>
						</div>
						<div className="justify-content-end">
							<p className="d-flex cart-money-desgin-right  ">
								<span className="right-name-style h5">
									Quantity
								</span>
								<span className="pl-2 main-name-style h5">
									<InputNumber
										min={1}
										max={product.quantity}
										defaultValue={1}
										onChange={handleQuantity}
										bordered={false}
									/>
								</span>
							</p>
						</div>
					</div>
				</div>
				<hr className="solid" />
			</div>
		</>
	);
};

export default EachProductCartDesgn;
