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
const AboutUs = () => {
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

	const aboutUs = () => {
		return (
			<div>
				<p className="Text-design-for-Quetion h3">
					<b className="h2 ">LiveSmart</b> is a website, where
					all the smart home related products is being available.
					<br /> Our main goal is to make a smart country.
				</p>
			</div>
		);
	};

	return (
		<>
			<PageHeader
				className="site-page-header"
				title="About Us"
				breadcrumb={{ routes }}
				
			/>
			<div className="card-container">
				<Tabs type="card">
					<TabPane tab="" key="1">
						<Collapse
							defaultActiveKey={["1"]}
							onChange={callback}>
							<Panel
								header="Who we are?"
								key="1">
								<p className="text-center">
									{aboutUs()}
								</p>
							</Panel>
						</Collapse>
					</TabPane>
				</Tabs>
			</div>
		</>
	);
};

export default AboutUs;
