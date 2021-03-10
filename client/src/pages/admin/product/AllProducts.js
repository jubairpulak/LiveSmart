import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Jumbtron from "../../../myComponent/cards/Jumbotron";

import AdminNav from "../../../myComponent/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../myComponent/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
const AllProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		loadAllProducts();
	}, []);

	const loadAllProducts = () => {
		setLoading(true);
		getProductsByCount(100)
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};
	const handleRemove = (slug) => {
		// let answer = window.confirm("Delete?")
		if (window.confirm("Delete?")) {
			// console.log("Want to Delete ? ", slug )
			removeProduct(slug, user.token)
				.then((res) => {
					loadAllProducts();
					toast.error(`${res.data.title} is deleted`);
					console.log("Product is deleted");
				})
				.catch((err) => {
					if ((err.response.status = 400)) {
						toast.error(err.response.data);
						console.log(err);
					}
				});
		}
	};

	return (
		<>
			<div className="jumbotron h1 font-wight-bold  text-center  mb-0 text-primary ">
				<Jumbtron
					text={[
						"Admin Products Page",
						`Number of Products : ${products.length}`,
					]}
				/>
			</div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-2">
						<AdminNav />
					</div>

					<div className="col">
						{loading ? (
							<h4 className="text-danger">Loading....</h4>
						) : (
							<h4>All Products</h4>
						)}
						<div className="row">
							{products.map((product) => (
								<div
									key={product._id}
									className="col-md-4 pb-3">
									<AdminProductCard
										product={product}
										handleRemove={handleRemove}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AllProducts;
