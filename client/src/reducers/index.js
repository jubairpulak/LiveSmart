import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { CartShowReducer } from "./CartShowReducer";
import { CouponReduce } from "./CouponReduce";
import { CODReducer } from "./CODReducer";

const rootReducer = combineReducers({
	user: userReducer,
	search: searchReducer,
	cart: cartReducer,
	show: CartShowReducer,
	coupon: CouponReduce,
	COD: CODReducer,
});

export default rootReducer;
