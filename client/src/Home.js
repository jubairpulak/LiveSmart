import React from "react";
import Jumbtron from "./myComponent/cards/Jumbotron";
import NewAribals from "./myComponent/home/NewArivals";
import BestSellers from "./myComponent/home/BestSellers";
import CategoryList from "./myComponent/category/CategoryList";
import SubList from "./myComponent/sub/SubList";
import bulbs from "./LightBanner.jpg";
import { AiOutlineMail } from "react-icons/ai";
import "./home.css";
import { Descriptions } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
	const { user } = useSelector((state) => ({ ...state }));

	return (
		<>
			<div className="home-body">
				<div className="jumbotron h1    mt-4   rounded text-success font-wight-bold  text-center bg-gradient mb-0 text-primary ">
					<Jumbtron
						text={[
							"Welcome To Our Site",
							"You Will Get Best Products",
							"With best price",
						]}
					/>
				</div>

				{/* <span className="card shadow arival-design"> */}
				{/* <h4 className="jumbotron card text-center arival-box-design p-3 mt-5 mb-3    display-3  ">
					<span className="heading-design">
						New Arival Products
					</span>
				</h4> */}

				<p>
					<NewAribals />
				</p>

				{/* <h4 className="jumbotron text-center p-3 mt-5 mb-5 bg-secondary display-3 ">
				Best Sellers
			</h4> */}

				<BestSellers />

				<h4 className="jumbotron text-center p-3 mt-5 mb-5 bg-secondary display-3 ">
					categories
				</h4>

				<CategoryList />

				<h4 className="jumbotron text-center p-3 mt-5 mb-5 bg-secondary display-3 ">
					Sub List
				</h4>

				<SubList />
				<br />
				<br />
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="d-flex justify-content-center card p-2">
								<Descriptions title="LiveSmart's Contract Address">
									<Descriptions.Item label="Email">
										{/* <AiOutlineMail size="20px" /> */}
										<p>jubairpulak77@gmail.com</p>
									</Descriptions.Item>
									<Descriptions.Item label="Telephone">
										01741223556
									</Descriptions.Item>

									<Descriptions.Item label="Address">
										Eastern Point, 8-9 Shanti
										Nagar Rd, Dhaka 1217
									</Descriptions.Item>
								</Descriptions>
							</div>
						</div>
					</div>
				</div>

				<div className="container-fluid mt-2">
					<div
						className="row  "
						style={{ backgroundColor: "#2E2E54" }}>
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
													Contract Us
												</Link>
											) : (
												<p className="text-white text-capitalize capital btn">
													Login to
													contract
												</p>
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
											to="/aboutus">
											About Us
										</Link>
									</p>
								</p>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
