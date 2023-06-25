const jwt = require(`jsonwebtoken`);

const verifyToken = (req, res, next) => {
  console.log(req.headers);
  const { authorization } = req.headers;
  console.log("authorization===>", authorization);
  try {
    if (authorization) {
      if (authorization.indexOf("Bearer") === -1) {
        res.send({
          status: 500,
          message: "Something Wrong",
        });
      } else {
        const token = authorization.slice(7);
        console.log("token========", token);
        const jwtKey = `aleem`;
        const decode =  jwt.verify(token , jwtKey)
        
        next()

        // res.send({
        //   status: 200,
        //   message: "hello",
        //   data:decode
        // });
      }

    } else {
      res.send({
        status: 500,
        message: "token missing!",
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
      catch:"catch"
    });
  }
};

module.exports = verifyToken;
