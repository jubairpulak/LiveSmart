import React, { useState, useEffect } from "react";
import { getSub } from "../../functions/sub";
import ProductCard from "../../myComponent/cards/ProductCard";

const SubHome = ({ match }) => {
	const [sub, setSub] = useState({});
	const [product, setProduct] = useState([]);
	const [loading, setLoading] = useState(false);

	const { slug } = match.params;
	useEffect(() => {
		setLoading(true);
		getSub(slug).then((res) => {
			// console.log(JSON.stringify(res.data, null, 4));
			setSub(res.data.sub);
			setProduct(res.data.products);
			setLoading(false);
		});
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col">
					{loading ? (
						<h3 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
							{" "}
							Loading...
						</h3>
					) : (
						<h3 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
							In this {sub.name} sub Category{" "}
							{product.length} products available
						</h3>
					)}
				</div>
			</div>

			<div className="text-center row pb-5">
				{product.map((p) => (
					<div className="pl-4 pr-4 col-md-3 mt-3" key={p._id}>
						<ProductCard product={p} />
					</div>
				))}
			</div>
		</div>
	);
};

export default SubHome;
