const express = require(`express`)
const router = express.Router()
const verifyToken = require(`../middleWares/varifyToken`)

const { signupUser , loginUser , getUserData } = require(`../controllers/userController`)

router.post(`/signup` , signupUser )
router.post(`/login` , loginUser )
router.post(`/userData`, verifyToken , getUserData )



module.exports = router