const userCheck = require("../scheme/userSchema");
const bcrypt = require("bcrypt");
let jwt = require(`jsonwebtoken`);

module.exports.signupUser = async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const userCheckRes = await userCheck({
      name,
      email,
      password: hashPassword,
    });
    const saveRes = await userCheckRes.save();

    res.send({
      status: 200,
      message: "Controller Api is working",
      data: saveRes,
    });
  } catch (error) {
    // console.log(error.message);
    res.send({
      status: 500,
      message: error.message,
    });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email , password);
  try {
    const userData = await userCheck.find({ email });
    if (userData.length > 0) {
      const hashedPassword = userData[0].password;
      // console.log(hashedPassword);
      const comparePasswordRes = await bcrypt.compare(password, hashedPassword);
      if (comparePasswordRes) {
        const jwtKey = `aleem`;
        const token = await jwt.sign({ email }, jwtKey);

        res.send({
          status: 200,
          message: "login SuccessFully",
          data: token,
          // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZWVtQG1haWwuY29tIiwiaWF0IjoxNjg3NTM0MzIxfQ.tHCne6epH7aTBcnMNUFFd-uJumMt4WSEd2SNjOJYfxM
        });
      } else {
        res.send({
          status: 200,
          message: "incorrect password",
          // data:comparePasswordRes
        });
      }
    } else {
      res.send({
        status: 200,
        message: "user not found",
        // data:userData
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
};

module.exports.getUserData = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const dbUser = await userCheck.find({ email });
    if (dbUser.length > 0) {
      res.send({
        status: 200,
        message: "user found",
        data: dbUser,
      });
    } else {
      res.send({
        status: 500,
        message: "user not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: error.message,
    });
  }
};
