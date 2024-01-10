let userDo = require("../model/user");
let jwt = require("jsonwebtoken");

exports.usermiddleware = async function (req, res, next) {
  try {
    let token=req.headers.token
    if(!token){
        throw new Error('!please attach the token')
    }
    let decoded = jwt.verify(token, 'user-token');
    let checkuser=await userDo.findById(decoded.id)
    if(!checkuser){
        throw new Error("!user is not find")
    }
    req.userId=decoded.id
    next()
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
