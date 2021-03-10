import React from "react";

const Orderproduct = ({ ord }) => (
	<>
		<table className="table table-bordered">
			{" "}
			<thead className="thead-light">
				<tr>
					<th scope="col">Title</th>
					<th scope="col">Price</th>
					<th scope="col">Brand</th>
					<th scope="col">Color</th>
					<th scope="col">Count</th>
				</tr>
			</thead>
			<tbody>
				{ord.products.map((p, i) => (
					<tr key={i}>
						<td>
							<b>{p.product.title}</b>
						</td>
						<td>
							<b>{p.product.price}</b>
						</td>
						<td>
							<b>{p.product.brand}</b>
						</td>
						<td>
							<b>{p.color}</b>
						</td>
						<td>
							<b>{p.count}</b>
						</td>
					</tr>
				))}
			</tbody>
		</table>
		);
	</>
);

export default Orderproduct;
