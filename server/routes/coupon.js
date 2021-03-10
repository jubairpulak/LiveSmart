const express = require("express");

const router = express.Router();
//import middleres
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers

const { create, remove, list } = require("../controllers/coupon");

router.post("/admin/coupon", authCheck, adminCheck, create);
router.get("/admin/coupon", list);

router.delete("/admin/coupon/:couponId", authCheck, adminCheck, remove);

module.exports = router;
