const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");

const {
	UserControler,
	getUserCart,
	emptyCartInfo,
	applyCoupon,
	createOrder,
	getOrders,
	addtowishlist,
	removewishlist,
	wishlist,
	addtousercart,
	removeUsercart,
	getcart,
	createcashOrder,
	sendfeedback,
} = require("../controllers/UserControler");

const {
	createReview,
	getReview,
	getReviewbyCount,
} = require("../controllers/reviewController");

router.post("/user/cart", authCheck, UserControler);
router.get("/user/cart", authCheck, getUserCart);
router.put("/user/cart", authCheck, emptyCartInfo);
router.post("/user/cart/coupon", authCheck, applyCoupon);
router.post("/user/order", authCheck, createOrder);
router.post("/user/cashpayment", authCheck, createcashOrder);
router.get("/user/orders", authCheck, getOrders);

router.post("/user/addtocart", authCheck, addtousercart);
router.get("/user/getcart", authCheck, getcart);
router.put("/user/deletecart/:productId", authCheck, removeUsercart);

router.post("/user/wishlist", authCheck, addtowishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removewishlist);

router.put("/user/:slug", authCheck, createReview);
router.post("/:slug", getReview);
router.post("/slug/rev", getReviewbyCount);
router.post("/user/feedback", authCheck, sendfeedback);

module.exports = router;
