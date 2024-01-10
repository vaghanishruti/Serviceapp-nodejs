let adminDo = require("../model/admin");
var jwt = require("jsonwebtoken");

exports.adminmiddleware = async function (req, res, next) {
  try {
    let token = req.headers.token;
    if(!token){
        throw new Error('please attach the token')
    }
    let decoded = jwt.verify(token, "admin-token");
    let checkAdmin = await adminDo.findById(decoded.id);
    if (!checkAdmin) {
      throw new Error("admin is not found");
    }
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
