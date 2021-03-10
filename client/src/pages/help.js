import React from "react";
import { PageHeader } from "antd";
import { Tabs } from "antd";
import { Collapse } from "antd";
import { List, Typography, Divider } from "antd";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./help.css";
import { Page } from "@react-pdf/renderer";
const { Panel } = Collapse;
const { TabPane } = Tabs;
const help = () => {
	const callback = (key) => {
		console.log(key);
	};
	const routes = [
		{
			path: "index",
			breadcrumbName: "First-level Menu",
		},
		{
			path: "first",
			breadcrumbName: "Second-level Menu",
		},
		{
			path: "second",
			breadcrumbName: "Third-level Menu",
		},
	];

	const showOrderAddress = () => {
		return (
			<div>
				<p className="Text-design-for-Quetion">
					Very Easy to Sign up. Just Follow these Steps
					<ul type="disc">
						<li>
							Go To <b>Cart </b> Page
						</li>
						<li>
							Click <b>Please Select</b> Dropdown menu from
							right middle of the page.
						</li>
						<li>Select The Place</li>
					</ul>
				</p>
			</div>
		);
	};

	const showSignup = () => {
		return (
			<div>
				<p className="Text-design-for-Quetion">
					Very Easy to Sign up. Just Follow these Steps
					<ul type="disc">
						<li>
							Go To <b>LiveSmart</b> Website
						</li>
						<li>
							Click <b>Registration</b> Button From Navbar
						</li>
						<li>
							Enter Your Correct <b>Email</b> Address into
							input box and Click <b>Register</b> button
						</li>
						<li>
							Find noreply doman <b>Gmail</b> of That Email
							Account
						</li>
						<li>Click the Sign Up Link</li>
						<li>
							Fill up <b>Password</b> and{" "}
							<b>Confirm Password</b> Field
						</li>
					</ul>
					<span className="q-animated">
						Hurrah! Your account has been created Successfully
					</span>
				</p>
			</div>
		);
	};

	const removeShoppingCart = () => {
		return (
			<div>
				<p className="Text-design-for-Quetion">
					Please Follow these Steps, To remove a product from
					your Shopping Cart :
					<ul>
						<li>
							Go To <b>Cart</b> Page
						</li>
						<li>
							Click <b>X</b> Button From Table
						</li>
					</ul>
				</p>
			</div>
		);
	};

	const showDarazPay = () => {
		return (
			<div>
				<p className="Text-design-for-Quetion">
					Please Follow these Steps to Pay using <b>Cards</b>
					<ul>
						<li>
							Click on <b>Processed To CheckOut Button</b>{" "}
							From Right Corner of the Page
						</li>
						<li>
							If any Cupon Available, Then fill the coupon
							field and Clicked on <b>Place Order</b>{" "}
							Button
						</li>
						<li>
							Input your valid <b>Card Number</b> in the
							card number box and Click on <b>Pay</b>{" "}
							Button
						</li>
					</ul>
					<span className="q-animated">
						Hurrah! You have successfully Paid using Card
					</span>
				</p>
			</div>
		);
	};
	const CashOnDelivery = () => {
		return (
			<div>
				<p className="Text-design-for-Quetion">
					Please Follow these Steps to Pay using{" "}
					<b>Cash on Delivery</b>
					<ul>
						<li>
							Click on{" "}
							<b>
								Processed To Pay Cash on Delivery Button
							</b>{" "}
							From Right Corner of the Page
						</li>
						<li>
							If any Cupon Available, Then apply the coupon
							and Clicked on <b>Place Order</b> Button
						</li>
					</ul>
					<span className="q-animated">
						Hurrah! You have successfully Paid using Card
					</span>
				</p>
			</div>
		);
	};
	const showdeliveryPay = () => {
		return (
			<div>
				<p className="Text-design-for-Quetion">
					Within 2 working days{" "}
				</p>
			</div>
		);
	};
	const showreturnPay = () => {
		return (
			<div>
				<p className="Text-design-for-Quetion">
					If your product is damaged, defective, incorrect or
					incomplete at the time of delivery, send your invoice
					id through contract page within 7 days{" "}
				</p>
			</div>
		);
	};
	const text = `
  {<ul><li>{"Hello Jubair"}</li></ul>}
`;
	return (
		<>
			<PageHeader
				className="site-page-header"
				title="Help Centers"
				breadcrumb={{ routes }}
				subTitle="Dear Customer, You Can find your necessary answers"
			/>
			<div className="card-container">
				<Tabs type="card">
					<TabPane tab="Account Managemnet" key="1">
						<Collapse
							defaultActiveKey={["1"]}
							onChange={callback}>
							<Panel
								header="How can I sign up as a customer on LiveSmart?"
								key="1">
								<p>{showSignup()}</p>
							</Panel>
						</Collapse>
					</TabPane>
					<TabPane tab="Orders" key="2">
						<Collapse
							defaultActiveKey={["1"]}
							onChange={callback}>
							<Panel
								header="How Can i add Delivery Address?"
								key="1">
								<p>{showOrderAddress()}</p>
							</Panel>
							<Panel
								header="How do i remove a product from shopping Cart?"
								key="2">
								<p>{removeShoppingCart()}</p>
							</Panel>
						</Collapse>
					</TabPane>
					<TabPane tab="Payments" key="3">
						<Collapse
							defaultActiveKey={["1"]}
							onChange={callback}>
							<Panel
								header="How Do I Pay on Daraz using Cards?"
								key="1">
								<p>{showDarazPay()}</p>
							</Panel>
							<Panel
								header="How Do I Pay on Daraz using Cash on Delivery?"
								key="2">
								<p>{CashOnDelivery()}</p>
							</Panel>
							<Panel
								header="How do i remove a product from shopping Cart?"
								key="3">
								<p>{removeShoppingCart()}</p>
							</Panel>
						</Collapse>
					</TabPane>
					<TabPane tab="Shippings & Delivery" key="4">
						<Collapse
							defaultActiveKey={["1"]}
							onChange={callback}>
							<Panel
								header="HOW LONG DOES IT TAKE TO DELIVER MY ORDER?"
								key="1">
								<p>{showdeliveryPay()}</p>
							</Panel>
						</Collapse>
					</TabPane>
					<TabPane tab="Returns" key="5">
						<Collapse
							defaultActiveKey={["1"]}
							onChange={callback}>
							<Panel header="Return Policy" key="1">
								<p>{showreturnPay()}</p>
							</Panel>
						</Collapse>
					</TabPane>
				</Tabs>
			</div>
			<div className="contianer">
				<div className="row">
					<div className="col-md-6 text-center">
						<Link to="/contract">
							<Button
								className="text-center"
								variant="outline-warning"
								size="lg">
								Contract With Us
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default help;
