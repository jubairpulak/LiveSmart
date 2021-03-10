const express = require('express')

const router = express.Router()
//import middleres
const {authCheck, adminCheck} = require('../middlewares/auth')

//controllers

const {createorupdateuser, currentUser} = require('../controllers/authcontroller')


//receive from backend
router.post('/create-or-update-user', authCheck, createorupdateuser)


router.post('/current-user', authCheck, currentUser)
router.post('/current-admin', authCheck, adminCheck, currentUser)

 module.exports = router