import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
	const { user } = useSelector((state) => ({ ...state }));

	const fileuploadAndResize = (e) => {
		//image upload here

		//Here Resize code
		let files = e.target.files;
		let allUploadFiles = values.images;

		if (files) {
			setLoading(true);
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					"JPEG",
					100,
					0,
					(uri) => {
						//console.log(url)
						axios.post(
							`${process.env.REACT_APP_API}/uploadimages`,
							{ image: uri },
							{
								headers: {
									authtoken: user ? user.token : "",
								},
							}
						)
							.then((res) => {
								console.log(
									"Image Upload Res Data",
									res
								);
								setLoading(false);
								allUploadFiles.push(res.data);
								setValues({
									...values,
									images: allUploadFiles,
								});
							})
							.catch((error) => {
								setLoading(false);
								console.log(
									"Image upload Error",
									error
								);
							});
					},
					"base64"
				);
			}
		}
	};

	const handleImageRemove = (public_id) => {
		setLoading(true);
		console.log("Removed Image", public_id);
		axios.post(
			`${process.env.REACT_APP_API}/removeimage`,
			{ public_id },
			{
				headers: {
					authtoken: user ? user.token : "",
				},
			}
		)
			.then((res) => {
				setLoading(false);
				const { images } = values;
				let filteredImages = images.filter((image) => {
					return image.public_id !== public_id;
				});
				setValues({ ...values, images: filteredImages });
			})
			.catch((err) => {
				console.log("Image Delete Error : ", err);
				setLoading(false);
			});
	};
	return (
		<>
			<div className="row">
				{values.images &&
					values.images.map((image) => (
						<Badge
							count="X"
							key={image.public_id}
							onClick={() =>
								handleImageRemove(image.public_id)
							}
							style={{ cursor: "pointer" }}>
							<Avatar
								src={image.url}
								size={70}
								shape="square"
								className="ml-3"
							/>
						</Badge>
					))}
			</div>

			<div className="row">
				<label className="btn btn-primary p-2 btn-raised  mt-3">
					Choose Images
					<input
						type="file"
						multiple
						hidden
						accept="images/*"
						onChange={fileuploadAndResize}
					/>{" "}
				</label>
			</div>
		</>
	);
};

export default FileUpload;
