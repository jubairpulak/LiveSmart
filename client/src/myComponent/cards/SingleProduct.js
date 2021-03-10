import React, { useState, useEffect } from "react";
import { Card, Tabs, Tooltip, Popover, Image } from "antd";
import { Link } from "react-router-dom";
import StarRating from "react-star-ratings";
import moment from "moment";
import { FacebookButton, FacebookCount } from "react-social";
import { toast } from "react-toastify";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
// import { Carousel } from "react-responsive-carousel";
import { Carousel } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import ReactImageZoom from "react-image-zoom";

// import { AiOutlineShareAlt } from "react-icons/Ai";
import { AiOutlineShareAlt } from "react-icons/ai";
import {
	Magnifier,
	GlassMagnifier,
	SideBySideMagnifier,
	PictureInPictureMagnifier,
	MOUSE_ACTIVATION,
	TOUCH_ACTIVATION,
} from "react-image-magnifiers";
import {
	FaFacebook,
	FaTwitter,
	FaPinterest,
	FaTumblr,
	FaGooglePlus,
	FaTumblrSquare,
} from "react-icons/fa";
import { FiHeart, FiHelpCircle } from "react-icons/fi";

import _ from "lodash";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";
import RatingModal from "./modal/RatingModal";
import { showAverage } from "../../functions/rating";
import {
	createUserwishlist,
	createreview,
	getReview,
} from "../../functions/user";

import "./singleproductstyle.css";

const { TabPane } = Tabs;

const { TextArea } = Input;
const SingleProduct = ({ product, onStarClick, star, couponinfo }) => {
	const {
		title,
		images,
		description,
		_id,
		slug,
		price,
		category,
		subs,
		shipping,
		color,
		brand,
		quantity,
		sold,
	} = product;
	const [tooltip, setTooltip] = useState("Click to  Add");
	const [review, Setreview] = useState([]);
	// const [reviews, Setreviews] = useState("");

	const dispatch = useDispatch();
	const history = useHistory();
	const { user, cart } = useSelector((state) => ({ ...state }));

	let url = `http://localhost:3000/product/${slug}`;

	const handleAdToCart = () => {
		let cart = [];
		if (typeof window !== "undefined") {
			if (localStorage.getItem("cart")) {
				cart = JSON.parse(localStorage.getItem("cart"));
			}
			//push new product to cart
			cart.push({
				...product,
				count: 1,
			});
			//remove duplicates from localstorage
			let unique = _.uniqWith(cart, _.isEqual);
			//save item into localstorage
			console.log("Unique Value : ", unique);
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
				toast.success("Add to Wishlist");
				// history.push("/user/wishlist");
			});
		} else {
			toast.error(
				"Please Login first, before add product to wishlist"
			);
		}
	};
	const content = (
		<div className="d-flex share-button">
			<p> Share via:</p>
			<p className="pl-3">
				<FaFacebook size="20px" color="#3B5998" />
			</p>
			<p className="pl-2">
				<FaTwitter size="20px" color="#5EAADE" />
			</p>
			<p className="pl-2">
				<FaGooglePlus size="20px" color="#D34836" />
			</p>
			<p className="pl-2">
				<FaPinterest size="20px" color="#CA242D" />
			</p>
			<p className="pl-2">
				<FaTumblr size="20px" color="#181818" />
			</p>
		</div>
	);

	const delivery_text = (
		<div className="pl-2">
			<h3 className="del-design">Delivery Options</h3>
			<p>
				<b className="del-home-desing pl-2">Home Delivery : </b>
				Enjoy delivery of your order directly to the Selected Place!
			</p>
			<Link to="/help" className="pl-2 del-home-link">
				Find out more
			</Link>
			<p className="pl-2 del-cash">Cash on Delivery Available</p>
		</div>
	);
	const return_warrenty = (
		<div className="pl-2">
			<h3 className="del-design">Return & Warranty</h3>
			<p>
				<b className="del-home-desing pl-2">7 Days Returns - </b> -
				Change of mind is not applicable as a Return Reason for this
				product <p className="term-style"> Terms & Conditions</p>{" "}
				apply
			</p>
			<p className="pl-2 del-home-link">Find out more</p>
			<p className="pl-2 del-cash">Cash on Delivery Available</p>
		</div>
	);

	const procedReview = (e) => {
		e.preventDefault();

		createreview(product._id, slug, review, user.token).then((res) => {
			console.log("Review ", res.data);
			toast.success("Review Added");
		});
	};
	

	return (
		<>
			<div className="col-md-12">
				<h4 className="jumbotron text-center bg-white info-design ">
					<span className="text-design">
						Product Information
					</span>
				</h4>
			</div>

			<div className="col-md-3 bg-white image-design">
				{/* //new try  */}

				{/* //new ending */}
				<Carousel showArrows={true} autoplay>
					{images &&
						images.map((image) => (
							<>
								<img
									className="image-resize"
									src={image.url}
									key={image.public_id}
								/>
							</>
						))}
				</Carousel>
			</div>

			<div className="col-md-5 bg-white">
				<h1 className="title-design">{title}</h1>
				<p className="total-detail-line">
					<p className="d-flex">
						<p className="pt-3">
							{product &&
							product.ratings &&
							product.ratings.length > 0 ? (
								showAverage(product)
							) : (
								<div className="text-left  pb-3 text-danger">
									No Rating Yet
								</div>
							)}
						</p>

						<div className=" wishlist">
							<Popover
								placement="bottomRight"
								content={content}
								trigger="click">
								<button className="btn  share-btn">
									<AiOutlineShareAlt size="25px" />
								</button>
							</Popover>
							<button
								className="btn pl-1 heart"
								onClick={handletowishlist}>
								<FiHeart size="25px" />
							</button>
						</div>
					</p>
					<span className="d-flex ">
						<p className="bnd">Brand :</p>
						<p className="bnd-title">{brand}</p>
					</span>
					<span className="d-flex ">
						<p className="bnd">Category :</p>
						<p className="cat-title">
							{category && (
								<a
									href={`/category/${category.slug}`}
									className=" label label-default label-pill pull-xs-right">
									{category.name}
								</a>
							)}
						</p>
					</span>
					<span className="d-flex ">
						<p className="bnd">Sub Category :</p>
						<p className="cat-title">
							{subs &&
								subs.map((sub) => (
									<Link
										key={sub._id}
										to={`/sub/${sub.slug}`}
										className=" label label-default label-pill pull-xs-right">
										{sub.name}
									</Link>
								))}
						</p>
					</span>
					<hr className="mr-3" />
					<p className="d-flex">
						<h5 className="money-style">৳</h5>
						<h5 className="pl-2 money-style">{price}</h5>
					</p>
					<hr />
					{/* <hr className="mr-3" />

					{/* Availability and sold  */}
					{/* <p className="d-flex">
						<h5 className="bnd-a">Already Sold : </h5>
						<h5 className="pl-2 money-style">{sold}</h5>
					</p>{" "} */}
					{/* */}
					<p className="d-flex ">
						<button className="btn ratings-btn ml-5 mr-5">
							<RatingModal>
								<StarRating
									name={_id}
									numerofStars={5}
									rating={star}
									changeRating={onStarClick}
									isSelectable={true}
									starRatedColor="red"
								/>
							</RatingModal>
						</button>
						<button className="btn cart-btn-desing ml-5">
							<a onClick={handleAdToCart}>
								<ShoppingCartOutlined
									// onClick={() => handleRemove(slug)}
									// className="text-danger"
									color="white"
									size="25px"
								/>
								<br />
								<p className="cart-logo">Add to Cart</p>
							</a>
						</button>
					</p>
				</p>

				
			</div>
			<div className="col-md-3 right-col">
				<p className="d-flex">
					<h4 className="right-delivery">Delivery Option</h4>

					<Popover
						placement="bottomRight"
						content={delivery_text}
						trigger="click">
						<p className="left-delivery-logo">
							<FiHelpCircle size="15px" />
						</p>
					</Popover>
				</p>
				<hr />
				<p className="pl-3 delivery-both">
					<p className="del-text-home">Home Delivery</p>
					<p className="del-text-home-below">3 - 7 days</p>
				</p>

				<p className="pl-3 del-cash">Cash on Delivery Available</p>
				<hr />
				{/* Return and Warrenty  */}
				<p className="d-flex">
					<h4 className="return-and-delivery">
						Return & Warranty
					</h4>

					<Popover
						placement="bottomRight"
						content={return_warrenty}
						trigger="click">
						<p className="product-logo-single">
							<FiHelpCircle size="15px" />
						</p>
					</Popover>
				</p>
				<p className="pl-3 delivery-both">
					<p className="del-text-home">7 Days Returns</p>
					<p className="del-text-home-below">
						Change of mind is not applicable
					</p>
				</p>
				<p className="pl-3 del-cash">1 Year Warrenty Available</p>
				<hr />
				<p className="d-flex">
					<h5 className="return-and-delivery pr-5">
						Already Sold :{" "}
					</h5>
					<h5 className=" money-style-left">{sold}</h5>
				</p>
				{couponinfo.map((coupon) => (
					<p>
						Use Coupon :{" "}
						<b
							className=" text-primary"
							style={{ paddingLeft: "140px" }}>
							{coupon.nam}
						</b>{" "}
						<br />
						Get :{" "}
						<b style={{ paddingLeft: "280px" }}>
							{coupon.discount}%
						</b>
						<br />
						Validity :{" "}
						<b style={{ paddingLeft: "160px" }}>
							{moment(coupon.expir).format("MMMM Do YYYY")}
						</b>
					</p>
				))}
			</div>
			<div className="col-md-12 box-design"></div>
			<div className="col-md-11 mt-2 pt-1 pl-3 box-product-detail">
				<h3 className="product-font-desing">
					Product Details of {title}
				</h3>
			</div>
			<div className="col-md-11 mt-0 pt-1 pl-3 box-product-detail-below">
				<h3 className="product-font-description">{description}</h3>
			</div>
			<hr />
			<div className="col-md-11 mt-0 pt-1 pl-3 box-product-detail-below">
				{images &&
					images.map((image) => (
						<img
							className="mx-auto d-block product-image-design"
							src={image.url}
							key={image.public_id}
						/>
					))}
			</div>
		</>
	);
};

export default SingleProduct;
