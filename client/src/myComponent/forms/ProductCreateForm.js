import React from "react";
import { Select } from "antd";
const { Option } = Select;
const ProductCreateForm = ({
	handleSubmit,
	handleChange,
	values,
	handleCategoryCHange,
	subOptions,
	showSub,
	setValues,
}) => {
	const {
		title,
		description,
		price,
		category,
		categories,
		subs,
		shippings,
		shipping,
		quantity,
		images,
		colors,
		brands,
		color,
		brand,
	} = values;
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
					placeholder="Enter Product Price"
					className="form-control"
					value={price}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Shipping</label>
				<select
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
					name="color"
					className="form-control"
					onChange={handleChange}>
					<option>Please Select</option>
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
					name="brand"
					className="form-control"
					onChange={handleChange}>
					<option>Please Select</option>
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
					onChange={handleCategoryCHange}>
					<option>Please Select</option>
					{categories.length > 0 &&
						categories.map((c) => (
							<option key={c._id} value={c._id}>
								{c.name}
							</option>
						))}
				</select>
			</div>

			{showSub && (
				<div>
					<label>Sub Categories </label>
					<Select
						mode="multiple"
						style={{ width: "100%" }}
						placeholder="PLease Select"
						value={subs}
						onChange={(value) =>
							setValues({ ...values, subs: value })
						}>
						{subOptions.length &&
							subOptions.map((s) => (
								<Option key={s._id} value={s._id}>
									{s.name}
								</Option>
							))}
					</Select>
				</div>
			)}
			<br />
			<button className="btn btn-outline-info">Save</button>
		</form>
	);
};

export default ProductCreateForm;
