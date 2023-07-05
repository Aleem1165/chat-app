const express = require(`express`);
const router = express.Router();
const verifyToken = require(`../middleWares/varifyToken`);

const {
  signupUser,
  loginUser,
  getUserData,
  createChatRoom,
  adMessageInChatRoom,
  existingChatRoom,
  getAllChatRooms,
  getSingleChatRoom,
} = require(`../controllers/userController`);

router.post(`/signup`, signupUser);
router.post(`/login`, loginUser);
router.get(
  `/userData`,
  //  verifyToken ,
  getUserData
);
router.post(`/createChatRoom`, createChatRoom);
router.post(`/adMsg`, adMessageInChatRoom);
router.post(`/existingChatRoom`, existingChatRoom);
router.get(`/getAllChetRooms`, getAllChatRooms);
router.post(`/getSingleChatRoom`, getSingleChatRoom);




module.exports = router;
