const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");

const {
	order,
	orderstatus,
	singleorder,
	sendproducts,
	getadminallusers,
	makeadmin,
	getallmails,
	checkmails,
	mailsCount,
	userCount,
	OrderCount,
	searchorder,
	senddatafeedback
} = require("../controllers/admin");

router.post("/admin/order", authCheck, adminCheck, order);
router.post("/admin/searchorder", authCheck, adminCheck, searchorder);
router.post("/admin/singleorder", authCheck, adminCheck, singleorder);
router.post("/admin/showchart", authCheck, adminCheck, sendproducts);
router.put("/admin/orderstatus", authCheck, adminCheck, orderstatus);
router.post("/admin/userlist", authCheck, adminCheck, getadminallusers);
router.post("/admin/mails", authCheck, adminCheck, getallmails);
router.post("/admin/mails/checkmail", authCheck, adminCheck, checkmails);
router.post("/admin/mail/checkmail", authCheck, adminCheck, senddatafeedback);
router.put("/admin/makeadmin", authCheck, adminCheck, makeadmin);

router.get("/mails/total", mailsCount);
router.get("/users/total", userCount);
router.get("/order/total", OrderCount);

module.exports = router;
