import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import Aos from "aos";
import "aos/dist/aos.css";

import { getProducts, getproductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import "./style.css";

import LoadingCard from "../cards/LoadingCard";
const BestSellers = () => {
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
		getProducts("sold", "desc", page).then((res) => {
			setProducts(res.data);
			setLoading(false);
		});
	};

	return (
		<>
			<div className="container container-design">
				<h2 className=" mb-4">Top Selles</h2>
				{loading ? (
					<LoadingCard count={3} />
				) : (
					<div className="container-fluid justify-content-center">
						<div className="row">
							{products.map((product) => (
								<div
									key={product._id}
									className="col-md-4"
									data-aos="fade-down"
									data-aos-easing="linear"
									data-aos-duration="1500">
									<ProductCard product={product} />
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			<div className="row">
				<nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
					<Pagination
						current={page}
						total={(productsCount / 3) * 10}
						onChange={(value) => setPage(value)}
					/>
				</nav>
			</div>
		</>
	);
};

export default BestSellers;
