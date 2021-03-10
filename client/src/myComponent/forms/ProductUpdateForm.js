import React from "react";
import { Select } from "antd";
import { Empty } from "antd";

const { Option } = Select;
const ProductUpdateForm = ({
	handleSubmit,
	handleChange,
	setValues,
	values,
	handleCategoryChange,
	categories,
	subOptions,
	arrayOfSubs,
	setArrayOfSubs,
	selectedCategory,
}) => {
	const {
		title,
		description,
		price,
		category,

		subs,
		shipping,
		quantity,
		images,
		colors,
		brands,
		color,
		brand,
	} = values;
	console.log(values);
	return (
		<form onSubmit={handleSubmit} className="card-body px-lg-5 pt-0">
			<div className="form-group ">
				<label>Title</label>
				<input
					type="text"
					name="title"
					className="form-control"
					placeholder="Enter Product Name"
					value={title}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Desicription</label>
				<input
					type="text"
					name="description"
					className="form-control"
					placeholder="Enter Product Description"
					value={description}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Price</label>
				<input
					type="number"
					name="price"
					className="form-control"
					placeholder="Enter Product Price"
					value={price}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Shipping</label>
				<select
					value={shipping === "Yes" ? "Yes" : "No"}
					name="shipping"
					className="form-control"
					onChange={handleChange}>
					<option>Please select</option>
					<option value="No">No</option>
					<option value="Yes">Yes</option>
				</select>
			</div>

			<div className="form-group">
				<label>Quantity</label>
				<input
					type="number"
					name="quantity"
					className="form-control"
					placeholder="Enter Product Quantity"
					value={quantity}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Color</label>
				<select
					value={color}
					name="color"
					className="form-control"
					onChange={handleChange}>
					{colors.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
			</div>

			<div className="form-group">
				<label>Brand</label>
				<select
					value={brand}
					name="brand"
					className="form-control"
					onChange={handleChange}>
					{brands.map((b) => (
						<option key={b} value={b}>
							{b}
						</option>
					))}
				</select>
			</div>

			<div className="form-group">
				<label>Category </label>
				<select
					name="category"
					className="form-control"
					onChange={handleCategoryChange}
					value={
						selectedCategory ? selectedCategory : category._id
					}>
					{categories.length > 0 &&
						categories.map((c) => (
							<option key={c._id} value={c._id}>
								{c.name}
							</option>
						))}
				</select>
			</div>

			<div>
				<label>Sub Categories </label>
				<Select
					mode="multiple"
					style={{ width: "100%" }}
					placeholder="PLease Select"
					value={arrayOfSubs}
					onChange={(value) => setArrayOfSubs(value)}>
					{subOptions.length
						? subOptions.map((s) => (
								<Option key={s._id} value={s._id}>
									{s.name}
								</Option>
						  ))
						: "<Empty />"}
				</Select>
			</div>

			<br />
			<button className="btn btn-outline-info">Save</button>
		</form>
	);
};

export default ProductUpdateForm;
