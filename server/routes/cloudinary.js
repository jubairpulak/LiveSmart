const express = require('express')

const router = express.Router()

const {authCheck, adminCheck} = require('../middlewares/auth')

//controllers

const {upload, remove} = require('../controllers/cloudinary')

//upload images
router.post('/uploadimages', authCheck, adminCheck, upload)
router.post('/removeimage', authCheck, adminCheck, remove)


module.exports = router;