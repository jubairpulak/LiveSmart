import React, { useState } from "react";
import { Menu, Badge } from "antd";
import { Tooltip, Image } from "antd";
import { Typography, Divider } from "antd";
import Navbar from "reactjs-navbar";

import {
	MailOutlined,
	LogoutOutlined,
	AppstoreOutlined,
	SettingOutlined,
	UserOutlined,
	UserAddOutlined,
	ShoppingOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";
import "./header.css";
import imagelogo from "./imgLogo.jpg";
import liveSmart from "./livesmart.png";
const { SubMenu, Item } = Menu;
const { Title, Paragraph, Text } = Typography;

const Header = () => {
	const [current, updatecurrent] = useState("");
	let dispatch = useDispatch();
	let history = useHistory();
	let { user, cart } = useSelector((state) => ({ ...state }));

	const handleClick = (e) => {
		console.log(e.key);
		updatecurrent(e.key);
	};

	const logout = () => {
		firebase.auth().signOut();
		dispatch({
			type: "LOGOUT",
			payload: null,
		});

		history.push("/login");
	};

	return (
		<>
			<nav className="navbar navbar-expand-lg   fixed-top">
				<div className="row">
					<Menu
						className="fixed-top nav-bg-design"
						style={{ height: "auto" }}
						onClick={handleClick}
						selectedKeys={[current]}
						mode="horizontal">
						<Item key="home" className="hom navbar-brand">
							<Link to="/">
								<span className="logo-style">
									LiveSmart
								</span>
							</Link>
						</Item>

						<Item key="shop" icon={<ShoppingOutlined />}>
							<Link to="/shop">
								<span className="sub-nav-style">
									Products
								</span>
							</Link>
						</Item>

						<Item key="cart" icon={<ShoppingCartOutlined />}>
							<Link to="/cart">
								<Badge
									count={cart.length}
									offset={[9, 0]}>
									<span className="sub-nav-style">
										Cart
									</span>
								</Badge>
							</Link>
						</Item>

						{/* <Item key="contractinfo" icon={<MailOutlined />}>
							<Tooltip title="Email : jubairpulak77@gmail.com">
								Contract Address
							</Tooltip>
						</Item> */}

						{!user && (
							<Item
								key="registar"
								icon={<UserAddOutlined />}
								className="float-right">
								<Link to="/register">
									{" "}
									<span className="sub-nav-style">
										Registration
									</span>
								</Link>
							</Item>
						)}
						{!user && (
							<Item
								key="login"
								icon={<UserOutlined />}
								className="float-right">
								<Link to="/login">
									{" "}
									<span className="sub-nav-style">
										Login
									</span>
								</Link>
							</Item>
						)}
						{user && (
							<SubMenu
								key="SubMenu"
								icon={<SettingOutlined />}
								title={
									user.email &&
									user.email.split("@")[0]
								}
								className="float-right">
								{user && user.role === "subscriber" && (
									<Item>
										<Link to="/user/history">
											<span className="sub-nav-style">
												Dashboard
											</span>
										</Link>
									</Item>
								)}

								{user && user.role === "admin" && (
									<Item>
										<Link to="/admin/dashboard">
											<span className="sub-nav-style">
												Dashboard
											</span>
										</Link>
									</Item>
								)}

								<Item
									icon={<LogoutOutlined />}
									onClick={logout}>
									LogOut
								</Item>
							</SubMenu>
						)}
						<span className="float-right  p-1">
							<span className="sub-nav-style">
								<Search />
							</span>
						</span>
					</Menu>
				</div>
			</nav>
		</>
	);
};
export default Header;
