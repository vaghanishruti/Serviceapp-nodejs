const bcrypt = require("bcrypt");
let adminDo = require("../model/admin");
var jwt = require("jsonwebtoken");
const userDo = require("../model/user");

exports.adminsign = async function (req, res, next) {
  try {
    if (!req.body.email || !req.body.password) {
      throw new Error("!please check your feilds");
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    let data = await adminDo.create({
      email: req.body.email,
      password: req.body.password,
    });
    let token = jwt.sign({ id: data._id }, "admin-token");
    res.status(201).json({
      status: "success",
      message: "admin is sign up",
      data: data,
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.adminlogin = async function (req, res, next) {
  try {
    let admin = await adminDo.findOne({ email: req.body.email });
    if (!admin) {
      throw new Error("!admin is not found");
    }
    let passwordcompare = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!passwordcompare) {
      throw new Error("!please check your password");
    }
    let token = jwt.sign({ id: admin._id }, "admin-token");
    res.status(200).json({
      status: "success",
      message: "admin is log in",
      data: admin,
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.userdelete = async function (req, res, next) {
  try {
    let id = req.query.id;
    let data = await userDo.findByIdAndDelete(id);
    console.log("data",data);
    res.status(200).json({
      status: "success",
      message: "user is delete by admin",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
