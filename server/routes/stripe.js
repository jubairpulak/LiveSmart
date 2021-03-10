const express = require("express");

const router = express.Router();

const { createPayment } = require("../controllers/stripe");

const { authCheck } = require("../middlewares/auth");

router.post("/create-payment", authCheck, createPayment);
module.exports = router;
