import React, { useEffect, useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Comment, Form, Button, List, Input } from "antd";
import Aos from "aos";
import { Pagination } from "antd";

import moment from "moment";
import { Carousel } from "antd";

import { toast } from "react-toastify";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";

import { getProduct, productStar, getRelated } from "../functions/product";
import SingleProduct from "../myComponent/cards/SingleProduct";
import { useSelector } from "react-redux";
import ProductCard from "../myComponent/cards/ProductCard";
import ShowReview from "../myComponent/cards/ShowReview";
import { createreview, getReview, getReviewCount } from "../functions/user";
import "aos/dist/aos.css";
import "./productpage.css";

const { TextArea } = Input;
const Product = ({ match }) => {
	const [product, setProduct] = useState({});
	const [related, setRelated] = useState([]);
	const [star, setStar] = useState(0);
	const [review, Setreview] = useState("");
	const [reviews, Setreviews] = useState([]);
	const [coupons, setCoupons] = useState([]);
	const [page, setPage] = useState(1);
	const [feedbackdata, setFeedbackdata] = useState("");
	const [reviewCount, setReviewCount] = useState(0);

	const { user } = useSelector((state) => ({ ...state }));
	const { slug } = match.params;

	useEffect(() => {
		Aos.init({ duration: 1700 });
		loadSingleProduct();
	}, [slug, page]);

	useEffect(() => {
		getReviewCount(slug).then((res) => setReviewCount(res.data));
	}, []);
	useEffect(() => {
		if (product.ratings && user) {
			let existingRatingObject = product.ratings.find(
				(e) => e.postedBy.toString() === user._id.toString()
			);
			existingRatingObject && setStar(existingRatingObject.star);
		}
	});

	// console.log("slug from main page: ", product.slug);

	const loadSingleProduct = () => {
		getProduct(slug).then((res) => {
			setProduct(res.data.Product);
			getRelated(res.data.Product._id).then((res) =>
				setRelated(res.data)
			);
			setCoupons(res.data.coupon);
			console.log("Coupon details", res.data.coupon);
		});

		getReview(slug, "createdAt", "desc", page)
			.then((c) => {
				Setreviews(c.data);
				console.log("Get Review ", c.data);
				// loadSingleProduct();
				// setProductsCount(c.data.rev.length + 1);
				console.log("data lenght : ", c.data.length + 1);
			})
			.catch();
	};

	const onStarClick = (newRating, name) => {
		setStar(newRating);
		productStar(name, newRating, user.token).then((res) => {
			console.log("rating clicked", res.data);
			loadSingleProduct();
		});
	};

	const procedReview = () => {
		createreview(slug, review, user.token)
			.then((res) => {
				console.log("Review  ", res.data);
				toast.success("Review Added");
				loadSingleProduct();
				Setreview("");
			})
			.catch((e) => console.log(e));
	};
	const hanldeSubmit = (e) => {
		e.preventDefault();
	};

	const Editor = () => {
		if (user) {
			return (
				<>
					<form onSubmit={(e) => e.preventDefault()}>
						<TextArea
							rows={4}
							value={review}
							onChange={(e) => Setreview(e.target.value)}
						/>

						<Button
							htmlType="submit"
							onClick={procedReview}
							type="primary">
							Add Comment
						</Button>
					</form>
				</>
			);
		} else {
			return <h3>Log In first To comment</h3>;
		}
	};

	return (
		<div className="container-fluid color-body">
			<div className="row  abc">
				<SingleProduct
					product={product}
					couponinfo={coupons}
					onStarClick={onStarClick}
					star={star}
				/>
				{/* {JSON.stringify(star)} */}
			</div>
			{/* {JSON.stringify(reviews)} */}

			<div className="row abc">
				<div className="col-md-11 mt-2  pl-3 review-deign ">
					<hr />
					<h4>Product Review Section</h4>

					<hr />
				</div>
			</div>
			<div className="row abc">
				<div class="col-md-11 mt-2  pl-3 review-deign ">
					{reviews.length > 0 ? (
						<>
							<ShowReview reviews={reviews} />
							<div className="row">
								<nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
									<Pagination
										current={page}
										total={(reviewCount / 2) * 10}
										onChange={(value) =>
											setPage(value)
										}
									/>
								</nav>
							</div>
						</>
					) : (
						<h3>No Reviews</h3>
					)}
					{Editor()}
				</div>
			</div>

			<div className="row abc">
				<div className="col-md-11 mt-2  pl-3 review-deign ">
					<hr />
					<h4> Related Prducts</h4>

					<hr />
				</div>
			</div>
			<div className="row abc">
				<div className="d-flex justify-content-center col-md-11 mt-2  pl-3 pt-2 review-deign">
					{related.length ? (
						related.map((related) => (
							<div key={related._id} className="col-md-3 ">
								<ProductCard product={related} />
							</div>
						))
					) : (
						<div className="text-center col">
							{" "}
							No Related Product found
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Product;
