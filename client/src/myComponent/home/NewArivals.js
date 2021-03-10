import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import Aos from "aos";
import "aos/dist/aos.css";
import { Carousel } from "antd";
import "./style.css";

import { getProducts, getproductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";

import LoadingCard from "../cards/LoadingCard";
const NewAribals = () => {
	const contentStyle = {
		height: "160px",
		color: "#fff",
		lineHeight: "160px",
		textAlign: "center",
		background: "#364d79",
	};

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [productsCount, setProductsCount] = useState(0);
	const [page, setPage] = useState(1);

	useEffect(() => {
		Aos.init({ duration: 1700 });
		loadAllProducts();
	}, [page]);

	useEffect(() => {
		getproductsCount().then((res) => setProductsCount(res.data));
	}, []);

	const loadAllProducts = () => {
		setLoading(true);
		//send sort order, limit
		getProducts("createdAt", "desc", page).then((res) => {
			setProducts(res.data);
			setLoading(false);
		});
	};

	return (
		<>
			<div className="container container-design mb-2">
				<h2>New Arrivals</h2>
				{loading ? (
					<LoadingCard count={3} />
				) : (
					<Carousel autoplay>
						{/* <h3 style={contentStyle}>1</h3> */}

						<div className="container container-design">
							<div className="row">
								{products.map((product) => (
									<div
										key={product._id}
										className="col-md-4"
										data-aos="flip-left">
										<ProductCard
											product={product}
											style={contentStyle}
										/>
									</div>
								))}
							</div>
						</div>
					</Carousel>
				)}
			</div>

			<div className="row">
				<nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
					<Pagination
						current={page}
						total={(productsCount / 3) * 10}
						onChange={(value) => setPage(value)}
					/>
					{/* {JSON.stringify(page)} */}
				</nav>
			</div>
		</>
	);
};

export default NewAribals;
