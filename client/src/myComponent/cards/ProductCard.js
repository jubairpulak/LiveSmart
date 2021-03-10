import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _, { uniq } from "lodash";
import { toast } from "react-toastify";
import { Wave } from "react-animated-text";
import { useHistory } from "react-router-dom";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

// import "./productCard.css";
import "./style.css";

import { showAverage } from "../../functions/rating";
import { createUserwishlist } from "./../../functions/user";
const { Meta } = Card;

const ProductCard = ({ product }) => {
	const { title, description, images, slug, price } = product;
	const [tooltip, setTooltip] = useState("Click to  Add");
	const { user, cart } = useSelector((state) => ({ ...state }));
	let history = useHistory();
	const dispatch = useDispatch();
	const handleAdToCart = () => {
		let cart = [];
		if (typeof window !== "undefined") {
			if (localStorage.getItem("cart")) {
				cart = JSON.parse(localStorage.getItem("cart"));
			}
			//push new product to cart
			// console.log("product : ", product);
			cart.push({
				...product,
				count: 1,
			});
			//remove duplicates from localstorage
			let unique = _.uniqWith(cart, _.isEqual);
			//save item into localstorage
			// console.log("Unique Value : ", unique);
			localStorage.setItem("cart", JSON.stringify(unique));
			setTooltip("Added");
			dispatch({
				type: "ADD_TO_CART",
				payload: unique,
			});
			dispatch({
				type: "SET_VISIBLE",
				payload: true,
			});
		}
	};
	const handletowishlist = (e) => {
		if (user) {
			e.preventDefault();
			createUserwishlist(product._id, user.token).then((res) => {
				console.log("Added to wishlist: ", res.data);
				toast.success("Added to Wishlist");
				// history.push("/user/wishlist");
			});
		} else {
			toast.error("Please Login First before add product to wishlist");
		}
	};
	return (
		<>
			<div className="product-top card card-shadow mb-2 ">
				<img
					src={images && images.length ? images[0].url : ""}
					className="abc p-2"
				/>
				<div className="overlay">
					<Link to={`/product/${slug}`}>
						<button
							type="button"
							className="btn btn-secondary"
							title="View Details">
							<FaEye className=" fa" />
						</button>
					</Link>
					<button
						type="button"
						className="btn btn-secondary"
						title="Add to wishlist">
						<FiHeart
							className=" fa"
							onClick={handletowishlist}
						/>
					</button>

					<a
						// type="button"
						onClick={handleAdToCart}
						disabled={product.quantity < 1}
						className="btn btn-secondary"
						title="Add To Cart">
						<FaShoppingCart className=" fa" />
					</a>
				</div>{" "}
				{product &&
				product.ratings &&
				product.ratings.length > 0 ? (
					<div className="pl-2 text-center product-bottom">
						{showAverage(product)}
					</div>
				) : (
					<div className="text-center h3   text-primary">
						No Ratings
					</div>
				)}
				<p className="product-bottom-2">
					{/* {title} - Tk{price} */}
					<p className="pl-2 titl-style">
						{" "}
						{title.substring(0, 24)}
					</p>
					<p className="d-flex pl-2 ">
						<h5 className="money-style">৳</h5>
						<h5 className="pl-2 money-style">{price}</h5>
					</p>
				</p>
			</div>
		</>
	);
};
export default ProductCard;
