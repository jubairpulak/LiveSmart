import React, { useEffect } from "react";
import { BackTop } from "antd";

import "./app.css";
import { Switch, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { auth } from "./firebase";

import { useDispatch } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

import Home from "./Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Help from "./pages/help";

import Header from "./myComponent/nav/Header";
import SideBarcar from "./myComponent/DrawComponent/SideBarCar";

import RegisterComplete from "./pages/auth/RegisterComplete";
import forgotpassword from "./pages/auth/Forgotpassword";
import { currentUser } from "./functions/auth";
import History from "./pages/user/History";
import password from "./pages/user/Password";
import updateprofile from "./pages/user/Profile";
import wishlist from "./pages/user/Wishlist";

import UserRoute from "./myComponent/routes/UserRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OrdercheckbyDate from "./pages/admin/OrdercheckbyDate";

import AdminRoute from "./myComponent/routes/AdminRoute";
import GetUserList from "./pages/admin/UserList/GetUserList";
import CategoryCreate from "./pages/admin/Category/CategoryCreate";
import CategoryUpdate from "./pages/admin/Category/CreateUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductCreate from "./pages/admin/product/ProductCreate";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import SingleOrderCheck from "./pages/admin/SingleOrder/SingleOrderCheck";
import chartshow from "./pages/admin/Chart/chartshow";

import Product from "./pages/Product";
import CategoryList from "./pages/Category/CategoryHome";
import CategoryHome from "./pages/Category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import ShopProduct from "./pages/ShopProduct";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Createcoupon from "./pages/admin/coupon/Createcoupon";
import PyamentProduct from "./pages/PaymentProduct";
import UserPassword from "./pages/admin/userPassword";
import CheckUsermail from "./pages/admin/UserList/Checkmaillist";
import Contract from "./pages/Contract";
import AboutUs from "./pages/AboutUs";

const style = {
	height: 40,
	width: 40,
	lineHeight: "40px",
	borderRadius: 4,
	backgroundColor: "#1088e9",
	color: "#fff",
	textAlign: "center",
	fontSize: 14,
};
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const idTokenResult = await user.getIdTokenResult();
				console.log("user", user);
				currentUser(idTokenResult.token)
					.then((res) => {
						dispatch({
							type: "LOGGED_IN_USER",
							payload: {
								name: res.data.name,
								email: res.data.email,
								token: idTokenResult.token,
								role: res.data.role,
								_id: res.data._id,
							},
						});
					})
					.catch((err) => console.log(err));
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<>
			<Header />

			<SideBarcar />
			<ToastContainer />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route
					exact
					path="/register/complete"
					component={RegisterComplete}
				/>
				<Route
					exact
					path="/forgot/password"
					component={forgotpassword}
				/>

				<UserRoute exact path="/user/history" component={History} />
				<UserRoute
					exact
					path="/user/password"
					component={password}
				/>
				<UserRoute
					exact
					path="/user/update-profile"
					component={updateprofile}
				/>
				<UserRoute
					exact
					path="/user/wishlist"
					component={wishlist}
				/>

				<AdminRoute
					exact
					path="/admin/dashboard"
					component={AdminDashboard}
				/>
				<AdminRoute
					exact
					path="/admin/order/datebased"
					component={OrdercheckbyDate}
				/>
				<AdminRoute
					exact
					path="/admin/password"
					component={UserPassword}
				/>
				<AdminRoute
					exact
					path="/admin/category"
					component={CategoryCreate}
				/>
				<AdminRoute
					exact
					path="/admin/userlist"
					component={GetUserList}
				/>
				<AdminRoute
					exact
					path="/admin/checkmail"
					component={CheckUsermail}
				/>
				<AdminRoute
					exact
					path="/admin/category/:slug"
					component={CategoryUpdate}
				/>
				<AdminRoute exact path="/admin/sub" component={SubCreate} />
				<AdminRoute
					exact
					path="/admin/sub/:slug"
					component={SubUpdate}
				/>
				<AdminRoute
					exact
					path="/admin/singleorder"
					component={SingleOrderCheck}
				/>
				<AdminRoute
					exact
					path="/admin/product"
					component={ProductCreate}
				/>
				<AdminRoute
					exact
					path="/admin/product/:slug"
					component={ProductUpdate}
				/>
				<AdminRoute
					exact
					path="/admin/products"
					component={AllProducts}
				/>
				<AdminRoute
					exact
					path="/admin/coupon"
					component={Createcoupon}
				/>
				<AdminRoute
					exact
					path="/admin/showchart"
					component={chartshow}
				/>
				<Route exact path="/product/:slug" component={Product} />
				<Route
					exact
					path="/category/:slug"
					component={CategoryHome}
				/>
				<Route exact path="/sub/:slug" component={SubHome} />
				<Route exact path="/shop" component={ShopProduct} />
				<Route exact path="/cart" component={Cart} />
				<Route exact path="/help" component={Help} />
				<Route exact path="/aboutus" component={AboutUs} />
				<UserRoute exact path="/contract" component={Contract} />
				<UserRoute exact path="/checkout" component={CheckOut} />
				<UserRoute
					exact
					path="/payment"
					component={PyamentProduct}
				/>
			</Switch>
			<BackTop>
				<div style={style}>UP</div>
			</BackTop>
		</>
	);
}

export default App;
