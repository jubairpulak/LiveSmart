import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SideBarCar = () => {
	const dispatch = useDispatch();
	const { show, cart } = useSelector((state) => ({ ...state }));

	const imagestl = {
		width: "100%",
		height: "70px",
		objectFit: "scale-down",
	};
	return (
		<>
			<Drawer
				className={"text-center"}
				onClose={() => {
					dispatch({
						type: "SET_VISIBLE",
						payload: false,
					});
				}}
				closable={false}
				visible={show}>
				<h4 className="jumbotron text-center p-3 mt-5 mb-5 display-3  ">
					Product : {cart.length}
				</h4>
				{cart.map((prod) => (
					<div key={prod._id} className="row">
						<div className="col">
							{prod.images[0] ? (
								<>
									<img
										src={prod.images[0].url}
										style={imagestl}
									/>
									<p className="text-center bg-secondary text-light">
										{prod.title} x {prod.count}
									</p>
								</>
							) : (
								<>
									<img
										src={prod.images[0].url}
										style={imagestl}
									/>
									<p className="text-center bg-secondary text-light">
										{prod.title} x {prod.count}
									</p>
								</>
							)}
						</div>
					</div>
				))}
				<Link to="/cart">
					<button
						onClick={() =>
							dispatch({
								type: "SET_VISIBLE",
								payload: false,
							})
						}
						className="text-center btn btn-primary btn-raised btn-block">
						Go To Cart Page
					</button>
				</Link>
			</Drawer>
		</>
	);
};

export default SideBarCar;
