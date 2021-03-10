import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

import {
	Table,
	TableHeader,
	TableCell,
	TableBody,
	DataTableCell,
} from "@david.kucsai/react-pdf-table";

const Invoice = ({ ord }) => (
	<Document>
		<Page style={styles.body}>
			<Text style={styles.header} fixed>
				~ {new Date().toLocaleString()}~
			</Text>
			<Text style={styles.title}>Invoice of Order</Text>
			<Text style={styles.author} fixed>
				Company :LIVESMART
			</Text>
			<Text style={styles.subtitle} fixed>
				Customer Name : {ord.username}
			</Text>
			<Table>
				<TableHeader>
					<TableCell>Title</TableCell>
					<TableCell>Price</TableCell>
					<TableCell>Quantity</TableCell>
					<TableCell>Brand</TableCell>
					<TableCell>Color</TableCell>
				</TableHeader>
			</Table>
			<Table data={ord.products}>
				<TableBody>
					<DataTableCell
						getContent={(prod) => prod.product.title}
					/>
					<DataTableCell
						getContent={(prod) => `TK.${prod.product.price}`}
					/>
					<DataTableCell getContent={(prod) => prod.count} />
					<DataTableCell
						getContent={(prod) => prod.product.brand}
					/>
					<DataTableCell
						getContent={(prod) => prod.product.color}
					/>
				</TableBody>
			</Table>
			<Text style={styles.text}>
				<Text>
					Date :{" "}
					{new Date(
						ord.paymentIntent.created * 1000
					).toLocaleString()}
				</Text>
				<Text>Order Id : {ord.paymentIntent.id}</Text>
				<Text>Order Status : {ord.orderStatus}</Text>
				<Text>Total Paid : {ord.paymentIntent.amount}</Text>
			</Text>
			<Text style={styles.footer}>Thank You For Staying With Us.</Text>
		</Page>
	</Document>
);

const styles = StyleSheet.create({
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
	},
	title: {
		fontSize: 24,
		textAlign: "center",
	},
	author: {
		fontSize: 12,
		textAlign: "center",
		marginBottom: 40,
	},
	subtitle: {
		fontSize: 18,
		margin: 12,
	},
	text: {
		margin: 12,
		fontSize: 14,
		textAlign: "justify",
	},
	image: {
		marginVertical: 15,
		marginHorizontal: 100,
	},
	header: {
		fontSize: 12,
		marginBottom: 20,
		textAlign: "center",
		color: "grey",
	},
	footer: {
		padding: "100px",
		fontSize: 12,
		marginBottom: 20,
		textAlign: "center",
		color: "grey",
	},
	pageNumber: {
		position: "absolute",
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: "center",
		color: "grey",
	},
});

export default Invoice;
