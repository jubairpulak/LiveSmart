import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Footernav = () => {
	const { user } = useSelector((state) => ({ ...state }));

	return (
		<div className="container-fluid mt-2">
			<div className="row  " style={{ backgroundColor: "#2E2E54" }}>
				<div className="col-md-12 p-2">
					<p className="d-flex">
						<p className="justify-content-start lower-left">
							<h2 className="text-white lower-design">
								Customer Care
							</h2>

							<p className="lower-spacing">
								<Link
									className="text-white text-capitalize btn"
									to="/help">
									Help Center
								</Link>

								<p className="text-white">
									{user ? (
										<Link
											className="text-white text-capitalize capital btn"
											to="/contract">
											Contract Us d
										</Link>
									) : (
										"Please Login to contract"
									)}
								</p>
							</p>
						</p>
						<p className="justify-content-center lower-right">
							<h2 className="text-white lower-design">
								LiveSmart
							</h2>
							<p className="lower-spacing">
								<Link
									className="text-white text-capitalize btn"
									to="/help">
									About Us
								</Link>
							</p>
						</p>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footernav;
