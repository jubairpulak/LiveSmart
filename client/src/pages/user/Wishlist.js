import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Jumbtron from "../../myComponent/cards/Jumbotron";
import { getUserwishlist, removeWishlist } from "../../functions/user";
import UserNav from "../../myComponent/nav/UserNav";
import { DeleteOutlined } from "@ant-design/icons";
import { Empty } from "antd";

const Wishlist = () => {
	const [wishlist, setWishlist] = useState([]);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		loadWishlist();
	}, []);

	const loadWishlist = () =>
		getUserwishlist(user.token).then((res) => {
			// console.log(res);
			setWishlist(res.data.wishlist);
		});
	const handleRemove = (id) =>
		removeWishlist(id, user.token).then((res) => {
			loadWishlist();
			toast.error("Item remove from wishlist");
		});
	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-2 mt-5 pt-5">
						<UserNav />
					</div>
					<div className="col-md-6 ml-4 mt-5 pt-5">
						<h4 className="text-center">
							Your Wish List
							<hr />
						</h4>
						<h4>
							{" "}
							{wishlist.length < 1 && (
								<h1 className="text-center p-5">
									<Empty />
								</h1>
							)}
							{wishlist.map((p) => (
								<div
									key={p.id}
									className="alert alert-secondary">
									<Link to={`/product/${p.slug}`}>
										{p.title}
									</Link>
									<span
										onClick={() =>
											handleRemove(p._id)
										}
										className="btn btn-sm float-right">
										<DeleteOutlined className="text-danger" />
									</span>
								</div>
							))}
						</h4>
					</div>
				</div>
			</div>
		</>
	);
};

export default Wishlist;
