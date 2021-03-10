import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Col, Row } from "antd";
import { Menu, Dropdown, Button } from "antd";
import { Cascader } from "antd";

import Jumbtron from "../../../myComponent/cards/Jumbotron";
import AdminNav from "../../../myComponent/nav/AdminNav";
import { getproductsadmin } from "../../../functions/admin";
import Chart from "./Chart";
import Piechart from "./Piechart";
import Monthchartshow from "./monthchartshow";
const Chartshow = (req, res) => {
	const [chart, setChart] = useState({});
	const [monthchart, setMonthChart] = useState({});
	const [februarymonthchart, setFebruaryMonthChart] = useState({});
	const [januarymonthchart, setJanuaryMonthChart] = useState({});
	const [marchmonthchart, setMarchMonthChart] = useState({});
	const [aprilmonthchart, setAprilMonthChart] = useState({});
	const [maymonthchart, setMayMonthChart] = useState({});
	const [junemonthchart, setJuneMonthChart] = useState({});
	const [julymonthchart, setJulyMonthChart] = useState({});
	const [augustmonthchart, setAugustMonthChart] = useState({});
	const [septembermonthchart, setSeptemberMonthChart] = useState({});
	const [octobermonthchart, setOctoberMonthChart] = useState({});
	const [novembermonthchart, setNovemberMonthChart] = useState({});
	const [decembermonthchart, setDecemberMonthChart] = useState({});
	const [valuedata, setValuedata] = useState("September");
	const [totalsold, setTotalsold] = useState(0);
	const [count, setCount] = useState(0);
	const [allproductamount, setAllproductamount] = useState(0);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		getData();
	}, []);

	const options = [
		{
			value: "January",
			label: "January",
		},
		{
			value: "February",
			label: "February",
		},
		{
			value: "March",
			label: "March",
		},
		{
			value: "April",
			label: "April",
		},
		{
			value: "May",
			label: "May",
		},
		{
			value: "June",
			label: "June",
		},
		{
			value: "July",
			label: "July",
		},
		{
			value: "August",
			label: "August",
		},
		{
			value: "September",
			label: "September",
		},
		{
			value: "October",
			label: "October",
		},
		{
			value: "November",
			label: "November",
		},
		{
			value: "December",
			label: "December",
		},
	];

	const showeachmonthchart = () => {
		if (valuedata === "January") {
			return (
				<div>
					<Chart data={januarymonthchart} />
				</div>
			);
		} else if (valuedata === "February") {
			return (
				<div>
					<Chart data={februarymonthchart} />
				</div>
			);
		} else if (valuedata === "March") {
			return (
				<div>
					<Chart data={marchmonthchart} />
				</div>
			);
		} else if (valuedata === "April") {
			return (
				<div>
					<Chart data={aprilmonthchart} />
				</div>
			);
		} else if (valuedata === "May") {
			return (
				<div>
					<Chart data={maymonthchart} />
				</div>
			);
		} else if (valuedata === "June") {
			return (
				<div>
					<Chart data={junemonthchart} />
				</div>
			);
		} else if (valuedata === "July") {
			return (
				<div>
					<Chart data={julymonthchart} />
				</div>
			);
		} else if (valuedata === "August") {
			return (
				<div>
					<Chart data={augustmonthchart} />
				</div>
			);
		} else if (valuedata === "September") {
			return (
				<div>
					<Chart data={septembermonthchart} />
				</div>
			);
		} else if (valuedata === "October") {
			return (
				<div>
					<Chart data={octobermonthchart} />
				</div>
			);
		} else if (valuedata === "November") {
			return (
				<div>
					<Chart data={novembermonthchart} />
				</div>
			);
		} else if (valuedata === "December") {
			return (
				<div>
					<Chart data={decembermonthchart} />
				</div>
			);
		}
	};

	const onChange = (val) => {
		let value = val[0];
		console.log("value : ", val[0]);

		setValuedata(value);

		// console.log("onchnge value:", value[2]);
		// setLocation(value);

		// if (value === "Dhanmondi 1") {
		// } else if (value === "Dhanmondi 2") {
		// } else if (value === "Dhanmondi 3") {
		// } else {
		// }

		// console.log(deliveryCharge);
	};
	// console.log(deli

	const getData = async () => {
		try {
			let title = [];
			let sold = [];
			let productprice = [];
			let January = [];
			let February = [];
			let March = [];
			let April = [];
			let May = [];
			let June = [];
			let July = [];
			let August = [];
			let September = [];
			let October = [];
			let November = [];
			let December = [];
			const res = await getproductsadmin(user.token);
			for (const dataObj of res.data.adminprod) {
				title.push(dataObj.title);
				sold.push(parseInt(dataObj.sold));
				January.push(parseInt(dataObj.January));
				February.push(parseInt(dataObj.February));
				March.push(parseInt(dataObj.March));
				April.push(parseInt(dataObj.April));
				May.push(parseInt(dataObj.May));
				June.push(parseInt(dataObj.June));
				July.push(parseInt(dataObj.July));
				August.push(parseInt(dataObj.August));
				September.push(parseInt(dataObj.September));
				October.push(parseInt(dataObj.October));
				November.push(parseInt(dataObj.November));
				December.push(parseInt(dataObj.December));

				// sold.push(parseInt(dataObj.sold));
			}

			console.log("February", July);
			const sumoffebruary = February.reduce((a, b) => {
				return a + b;
			}, 0);
			const sumofjanuary = January.reduce((a, b) => {
				return a + b;
			}, 0);
			const sumofmarch = March.reduce((a, b) => {
				return a + b;
			}, 0);
			const sumofapril = April.reduce((a, b) => {
				return a + b;
			}, 0);
			const sumofmay = May.reduce((a, b) => {
				return a + b;
			}, 0);
			const sumofjune = June.reduce((a, b) => {
				return a + b;
			}, 0);

			const sumofjuly = July.reduce((a, b) => {
				return a + b;
			}, 0);

			const sumofaugust = August.reduce((a, b) => {
				return a + b;
			}, 0);
			const sumofseptember = September.reduce((a, b) => {
				return a + b;
			}, 0);
			const sumofoctober = October.reduce((a, b) => {
				return a + b;
			}, 0);
			const sumofnovember = November.reduce((a, b) => {
				return a + b;
			}, 0);
			const sumofdecember = December.reduce((a, b) => {
				return a + b;
			}, 0);
			const monthlyjsondata = [
				sumofjanuary,
				sumoffebruary,
				sumofmarch,
				sumofapril,
				sumofmay,
				sumofjune,
				sumofjuly,
				sumofaugust,
				sumofseptember,
				sumofoctober,
				sumofnovember,
				sumofdecember,
			];
			console.log("monthlyjson", monthlyjsondata);
			console.log("Sum of february", sumoffebruary);

			for (const dataObj of res.data.SoldTkamount) {
				// title.push(dataObj.title);
				productprice.push(parseInt(dataObj.paymentIntent.amount));
			}

			console.log("Total SOld :", productprice);

			const sumoftotalsold = sold.reduce((a, b) => {
				return a + b;
			}, 0);
			const sumofproudctamount = productprice.reduce((a, b) => {
				return a + b;
			}, 0);
			setTotalsold(sumoftotalsold);
			setAllproductamount(sumofproudctamount);
			console.log("Sold of all price", sold);
			console.log("Sold of all price", February);
			console.log("TOtal Summisition", sumoftotalsold);
			console.log("TOtal Summisition of amount", sumofproudctamount);
			setChart({
				labels: title,
				datasets: [
					{
						label: "Selling Graph",
						data: sold,
						backgroundColor: [
							"rgba(255,99,132,0.2)",
							"rgba(54,162,235,0.2)",
							"rgba(255,206,86,0.2)",
							"rgba(75,102,255,0.2)",
							"rgba(153,102,255,0.2)",
							"rgba(255,159,64,0.2)",
							"rgba(255,159,64,0.2)",
						],
						borderColor: [
							"rgba(255,99,132,1)",
							"rgba(54,162,235,1)",
							"rgba(255,206,86,1)",
							"rgba(75,102,255,1)",
							"rgba(153,102,255,1)",
							"rgba(255,159,64,1)",
							"rgba(255,159,64,1)",
						],
						borderWidth: 3,
					},
				],
			});
			setMonthChart({
				labels: title,

				datasets: [
					{
						label: "Selling Monthly Graph",
						data: monthlyjsondata,
						backgroundColor: [
							"rgba(255,99,132,0.2)",
							"rgba(54,162,235,0.2)",
							"rgba(255,206,86,0.2)",
							"rgba(75,102,255,0.2)",
							"rgba(153,102,255,0.2)",
							"rgba(255,159,64,0.2)",
							"rgba(255,159,64,0.2)",
						],
						borderColor: [
							"rgba(255,99,132,1)",
							"rgba(54,162,235,1)",
							"rgba(255,206,86,1)",
							"rgba(75,102,255,1)",
							"rgba(153,102,255,1)",
							"rgba(255,159,64,1)",
							"rgba(255,159,64,1)",
						],
						borderWidth: 3,
					},
				],
			});
			setJanuaryMonthChart({
				labels: title,
				datasets: [
					{
						label: `Selling Product in January`,
						data: January,
						backgroundColor: [
							"rgba(255,99,132,0.2)",
							"rgba(54,162,235,0.2)",
							"rgba(255,206,86,0.2)",
							"rgba(75,102,255,0.2)",
							"rgba(153,102,255,0.2)",
							"rgba(255,159,64,0.2)",
							"rgba(255,159,64,0.2)",
						],
						borderColor: [
							"rgba(255,99,132,1)",
							"rgba(54,162,235,1)",
							"rgba(255,206,86,1)",
							"rgba(75,102,255,1)",
							"rgba(153,102,255,1)",
							"rgba(255,159,64,1)",
							"rgba(255,159,64,1)",
						],
						borderWidth: 3,
					},
				],
			});
			setFebruaryMonthChart({
				labels: title,
				datasets: [
					{
						label: `Selling Product in February`,
						data: February,
						backgroundColor: [
							"rgba(255,99,132,0.2)",
							"rgba(54,162,235,0.2)",
							"rgba(255,206,86,0.2)",
							"rgba(75,102,255,0.2)",
							"rgba(153,102,255,0.2)",
							"rgba(255,159,64,0.2)",
							"rgba(255,159,64,0.2)",
						],
						borderColor: [
							"rgba(255,99,132,1)",
							"rgba(54,162,235,1)",
							"rgba(255,206,86,1)",
							"rgba(75,102,255,1)",
							"rgba(153,102,255,1)",
							"rgba(255,159,64,1)",
							"rgba(255,159,64,1)",
						],
						borderWidth: 3,
					},
				],
			});
			setMarchMonthChart({
				labels: title,
				datasets: [
					{
						label: `Selling Product in March`,
						data: March,
						backgroundColor: [
							"rgba(255,99,132,0.2)",
							"rgba(54,162,235,0.2)",
							"rgba(255,206,86,0.2)",
							"rgba(75,102,255,0.2)",
							"rgba(153,102,255,0.2)",
							"rgba(255,159,64,0.2)",
							"rgba(255,159,64,0.2)",
						],
						borderColor: [
							"rgba(255,99,132,1)",
							"rgba(54,162,235,1)",
							"rgba(255,206,86,1)",
							"rgba(75,102,255,1)",
							"rgba(153,102,255,1)",
							"rgba(255,159,64,1)",
							"rgba(255,159,64,1)",
						],
						borderWidth: 3,
					},
				],
			});
			setAprilMonthChart({
				labels: title,
				datasets: [
					{
						label: `Selling Product in April`,
						data: April,
						backgroundColor: [
							"rgba(255,99,132,0.2)",
							"rgba(54,162,235,0.2)",
							"rgba(255,206,86,0.2)",
							"rgba(75,102,255,0.2)",
							"rgba(153,102,255,0.2)",
							"rgba(255,159,64,0.2)",
							"rgba(255,159,64,0.2)",
						],
						borderColor: [
							"rgba(255,99,132,1)",
							"rgba(54,162,235,1)",
							"rgba(255,206,86,1)",
							"rgba(75,102,255,1)",
							"rgba(153,102,255,1)",
							"rgba(255,159,64,1)",
							"rgba(255,159,64,1)",
						],
						borderWidth: 3,
					},
				],
			});
			setMayMonthChart({
				labels: title,
				datasets: [
					{
						label: `Selling Product in May`,
						data: May,
						backgroundColor: [
							"rgba(255,99,132,0.2)",
							"rgba(54,162,235,0.2)",
							"rgba(255,206,86,0.2)",
							"rgba(75,102,255,0.2)",
							"rgba(153,102,255,0.2)",
							"rgba(255,159,64,0.2)",
							"rgba(255,159,64,0.2)",
						],
						borderColor: [
							"rgba(255,99,132,1)",
							"rgba(54,162,235,1)",
							"rgba(255,206,86,1)",
							"rgba(75,102,255,1)",
							"rgba(153,102,255,1)",
							"rgba(255,159,64,1)",
							"rgba(255,159,64,1)",
						],
						borderWidth: 3,
					},
				],
			});
			setJuneMonthChart({
				labels: title,
				datasets: [
					{
						label: `Selling Product in June`,
						data: June,
						backgroundColor: [
							"rgba(255,99,132,0.2)",
							"rgba(54,162,235,0.2)",
							"rgba(255,206,86,0.2)",
							"rgba(75,102,255,0.2)",
							"rgba(153,102,255,0.2)",
							"rgba(255,159,64,0.2)",
							"rgba(255,159,64,0.2)",
						],
						borderColor: [
							"rgba(255,99,132,1)",
							"rgba(54,162,235,1)",
							"rgba(255,206,86,1)",
							"rgba(75,102,255,1)",
							"rgba(153,102,255,1)",
							"rgba(255,159,64,1)",
							"rgba(255,159,64,1)",
						],
						borderWidth: 3,
					},
				],
			});
			setJulyMonthChart({
				labels: title,
				datasets: [
					{
						label: `Selling Product in July`,
						data: July,
						backgroundColor: [
							"rgba(255,99,132,0.2)",
							"rgba(54,162,235,0.2)",
							"rgba(255,206,86,0.2)",
							"rgba(75,102,255,0.2)",
							"rgba(153,102,255,0.2)",
							"rgba(255,159,64,0.2)",
							"rgba(255,159,64,0.2)",
						],
						borderColor: [
							"rgba(255,99,132,1)",
							"rgba(54,162,235,1)",
							"rgba(255,206,86,1)",
							"rgba(75,102,255,1)",
							"rgba(153,102,255,1)",
							"rgba(255,159,64,1)",
							"rgba(255,159,64,1)",
						],
						borderWidth: 3,
					},
				],
			});
			setAugustMonthChart({
				labels: title,
				datasets: [
					{
						label: `Selling Product in August`,
						data: August,
						backgroundColor: [
							"rgba(255,99,132,0.2)",
							"rgba(54,162,235,0.2)",
							"rgba(255,206,86,0.2)",
							"rgba(75,102,255,0.2)",
							"rgba(153,102,255,0.2)",
							"rgba(255,159,64,0.2)",
							"rgba(255,159,64,0.2)",
						],
						borderColor: [
							"rgba(255,99,132,1)",
							"rgba(54,162,235,1)",
							"rgba(255,206,86,1)",
							"rgba(75,102,255,1)",
							"rgba(153,102,255,1)",
							"rgba(255,159,64,1)",
							"rgba(255,159,64,1)",
						],
						borderWidth: 3,
					},
				],
			});
			setSeptemberMonthChart({
				labels: title,
				datasets: [
					{
						label: `Selling Product in September`,
						data: September,
						backgroundColor: [
							"rgba(255,99,132,0.2)",
							"rgba(54,162,235,0.2)",
							"rgba(255,206,86,0.2)",
							"rgba(75,102,255,0.2)",
							"rgba(153,102,255,0.2)",
							"rgba(255,159,64,0.2)",
							"rgba(255,159,64,0.2)",
						],
						borderColor: [
							"rgba(255,99,132,1)",
							"rgba(54,162,235,1)",
							"rgba(255,206,86,1)",
							"rgba(75,102,255,1)",
							"rgba(153,102,255,1)",
							"rgba(255,159,64,1)",
							"rgba(255,159,64,1)",
						],
						borderWidth: 3,
					},
				],
			});
			setOctoberMonthChart({
				labels: title,
				datasets: [
					{
						label: `Selling Product in October`,
						data: October,
						backgroundColor: [
							"rgba(255,99,132,0.2)",
							"rgba(54,162,235,0.2)",
							"rgba(255,206,86,0.2)",
							"rgba(75,102,255,0.2)",
							"rgba(153,102,255,0.2)",
							"rgba(255,159,64,0.2)",
							"rgba(255,159,64,0.2)",
						],
						borderColor: [
							"rgba(255,99,132,1)",
							"rgba(54,162,235,1)",
							"rgba(255,206,86,1)",
							"rgba(75,102,255,1)",
							"rgba(153,102,255,1)",
							"rgba(255,159,64,1)",
							"rgba(255,159,64,1)",
						],
						borderWidth: 3,
					},
				],
			});
			setNovemberMonthChart({
				labels: title,
				datasets: [
					{
						label: `Selling Product in November`,
						data: November,
						backgroundColor: [
							"rgba(255,99,132,0.2)",
							"rgba(54,162,235,0.2)",
							"rgba(255,206,86,0.2)",
							"rgba(75,102,255,0.2)",
							"rgba(153,102,255,0.2)",
							"rgba(255,159,64,0.2)",
							"rgba(255,159,64,0.2)",
						],
						borderColor: [
							"rgba(255,99,132,1)",
							"rgba(54,162,235,1)",
							"rgba(255,206,86,1)",
							"rgba(75,102,255,1)",
							"rgba(153,102,255,1)",
							"rgba(255,159,64,1)",
							"rgba(255,159,64,1)",
						],
						borderWidth: 3,
					},
				],
			});
			setDecemberMonthChart({
				labels: title,
				datasets: [
					{
						label: `Selling Product in December`,
						data: December,
						backgroundColor: [
							"rgba(255,99,132,0.2)",
							"rgba(54,162,235,0.2)",
							"rgba(255,206,86,0.2)",
							"rgba(75,102,255,0.2)",
							"rgba(153,102,255,0.2)",
							"rgba(255,159,64,0.2)",
							"rgba(255,159,64,0.2)",
						],
						borderColor: [
							"rgba(255,99,132,1)",
							"rgba(54,162,235,1)",
							"rgba(255,206,86,1)",
							"rgba(75,102,255,1)",
							"rgba(153,102,255,1)",
							"rgba(255,159,64,1)",
							"rgba(255,159,64,1)",
						],
						borderWidth: 3,
					},
				],
			});
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<>
			<div className="jumbotron h1 font-wight-bold  text-center  mb-0 text-primary ">
				<Jumbtron
					text={[
						"New Products",
						`Total Porduct Sold : ${totalsold} `,
						`Total Amount in Taka : ${allproductamount} `,
					]}
				/>
			</div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-2">
						<AdminNav />
					</div>
					<div className="col-md-10">
						<div className="row">
							<div className="col-md-12 text-center">
								<h3>Total Sells Data in Bar Chart</h3>
								<br />

								<div>
									<Chart data={chart} />
								</div>
							</div>
							<hr />
							<br />
							<div className="col-md-12 mt-3">
								<h3>Total Sells Data in Pie Chart</h3>
								<br />
								{/* {JSON.stringify(chart)} */}
								<div>
									<Piechart data={chart} />
								</div>
							</div>
							<div className="col-md-12 mt-3">
								<h3>Month Based Products Sells data</h3>
								<br />
								{/* {JSON.stringify(chart)} */}
								<div>
									<Monthchartshow
										data={monthchart}
									/>
								</div>
							</div>
							<hr />
							<div className="col-md-12 mt-3">
								<h3>Monthly sales data</h3>

								<Cascader
									options={options}
									expandTrigger="hover"
									// displayRender={displayRender}
									onChange={onChange}
									placeholder="Please select"
								/>
								<br />

								<p>{showeachmonthchart()}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Chartshow;
