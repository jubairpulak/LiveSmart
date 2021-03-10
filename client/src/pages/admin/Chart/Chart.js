import React from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

const Chart = ({ data }) => {
	// console.log(data);

	return (
		<>
			<Bar
				data={data}
				options={{
					scales: {
						yAxes: [
							{
								ticks: {
									beginAtZero: true,
								},
							},
						],
						// xAxes: [
						// 	{
						// 		display: false,
						// 	},
						// ],
					},
				}}
			/>
			{/* <Doughnut data={data} options={options} />
			<div style={styles.pieContainer}>
				<Pie
					data={data}
					options={pieOptions}
					ref={(input) => {
						chartInstance = input;
					}}
				/>
			</div> */}
		</>
	);
};

export default Chart;
