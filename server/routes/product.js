const express = require("express");

const router = express.Router();
//import middleres
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers

const {
	create,
	listAll,
	remove,
	read,
	update,
	list,
	productsCount,
	productStar,
	listRelated,
	searchFilters,
} = require("../controllers/product");
const { auth } = require("../firebase");

router.post("/product", authCheck, adminCheck, create);
//send produts to frontend
router.get("/products/total", productsCount);


router.get("/products/:count", listAll);
router.get("/product/:slug", read);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.put("/product/:slug", authCheck, adminCheck, update);
router.post("/products", list);

router.put("/product/star/:productId", authCheck, productStar);

router.get("/product/related/:productId", listRelated);
router.post("/search/filters", searchFilters);

module.exports = router;
