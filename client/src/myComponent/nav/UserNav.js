import React from "react";

import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import {
	AppstoreOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	PieChartOutlined,
	DesktopOutlined,
	ContainerOutlined,
	MailOutlined,
} from "@ant-design/icons";
const UserNav = () => {
	const { SubMenu } = Menu;

	return (
		<>
			<div style={{ width: 256 }}>
				<Menu mode="inline">
					<Menu.Item key="1" icon={<PieChartOutlined />}>
						<Link to="/user/history" /> History
					</Menu.Item>
					<Menu.Item key="2" icon={<DesktopOutlined />}>
						<Link to="/user/password" />
						Update Password
					</Menu.Item>
					<Menu.Item key="3" icon={<ContainerOutlined />}>
						<Link to="/user/wishlist" /> WishList
					</Menu.Item>
				</Menu>
			</div>
		</>
	);
};

export default UserNav;
