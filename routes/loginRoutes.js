const express = require("express")
const router = express.Router()
const user = require("../controllers/loginController")

router.post("/register",user.register)
router.post("/login",user.login)


module.exports = router

