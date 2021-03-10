import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	CloseOutlined,
} from "@ant-design/icons";

const ProductCartCheckOut = ({ product }) => {
	let Dispatch = useDispatch();
	const color = ["Black", "Brown", "Silver", "White", "Blue", "Red"];
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
				let cont = elm.target.value < 1 ? 1 : elm.target.value;
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
			}
			// console.log("update cart : ", cart)
			localStorage.setItem("cart", JSON.stringify(cart));
			Dispatch({
				type: "ADD_TO_CART",
				payload: cart,
			});
		}
	};
	const handleColor = (elm) => {
		let color = "color";
		// console.log(color);
		updatedetails(elm, color);
	};

	const handleQuantity = (elm) => {
		let count = "count";
		console.log("Total COunt : ", elm);
		updatedetails(elm, count);
	};

	const hanldeRemove = (elm) => {
		// console.log(product._id, "to Remove");
		updatedetails(elm, "remove");
	};
	return (
		<tbody>
			<tr>
				<td>
					<div style={{ maxwidth: "80%", maxheight: "60%" }}>
						{product.images.length ? (
							<ModalImage
								small={product.images[0].url}
								large={product.images[0].url}
							/>
						) : (
							<p>Images</p>
						)}
					</div>
				</td>
				<td>
					<Link to={`/product/${product.slug}`}>
						{product.title}
					</Link>
				</td>
				<td>TK.{product.price}</td>
				<td>{product.brand}</td>
				<td>
					<select
						onChange={handleColor}
						name="color"
						className="form-control pointer">
						{product.color ? (
							<option value={product}>
								{product.color}
							</option>
						) : (
							<option>Select</option>
						)}
						{color
							.filter((col) => col !== product.color)
							.map((col) => (
								<option key={col} value={col}>
									{col}
								</option>
							))}
					</select>
				</td>
				<td className="text-center">
					<input
						type="number"
						className="form-control"
						value={product.count}
						onChange={handleQuantity}
					/>
				</td>
				<td className="text-center">
					{product.shipping === "Yes" ? (
						<CheckCircleOutlined className="text-success  " />
					) : (
						<CloseCircleOutlined className="text-danger " />
					)}
				</td>
				<td className="text-center">
					<CloseOutlined
						onClick={hanldeRemove}
						className="text-danger pointer"
					/>
				</td>
			</tr>
		</tbody>
	);
};
export default ProductCartCheckOut;
