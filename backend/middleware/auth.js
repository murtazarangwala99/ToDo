//  Pending

const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token;
  // const token = req.cookies || req.header || req.body;
  // authorization: "Bearer longtokenvalue";
  // const token = req.header("Authorization").replace("Bearer ", "");
  // what if token is not there
  if (!token) {
    return res.status(403).send("Token Missing/Access Denied");
  }
  //  Verify token
  try {
    const decode = jwt.verify(token, "shhhhh");
    console.log(decode);
    req.user = decode;
    // extract if from token and query the DB ---
  } catch (error) {
    res.status(403).send("Token Invalid !");
  }
  return next();
};
module.exports = auth;
