import React from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

const Piechart = ({ data }) => {
	// console.log(data);

	return (
		<>
			<Pie
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

export default Piechart;
