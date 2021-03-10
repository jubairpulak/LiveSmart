import React from "react";

import UserNav from "../../myComponent/nav/UserNav";
import Jumbtron from "../../myComponent/cards/Jumbotron";

const Profile = () => {
	return (
		<>
			<div className="jumbotron h1 font-wight-bold  text-center  mb-0 text-primary ">
				<Jumbtron
					text={[
						"New Products",
						"New Arival Products",
						"Best Sellers",
					]}
				/>
			</div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-2">
						<UserNav />
					</div>
					<div className="col">User Profile Page</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
