let userDo = require("../model/user");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.alluser = async function (req, res, next) {
  try {
    let data = await userDo.find();
    res.status(200).json({
      status: "success",
      message: "user is sign up",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.usersign = async function (req, res, next) {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.firstName ||
      !req.body.lastName
    ) {
      throw new Error("!please check youe feilds");
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    let totaldata = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    let data = await userDo.create(totaldata);
    console.log("data====",data);
    var token = jwt.sign({ id: data._id }, "user-token");
    res.status(201).json({
      status: "success",
      message: "user is sign up",
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

exports.userlogin = async function (req, res, next) {
  try {
    let user = await userDo.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("!user is not found");
    }
    let passwordcompare = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordcompare) {
      throw new Error("!user password id not valid");
    }
    let token = jwt.sign({ id: user._id }, "user-token");
    res.status(200).json({
      status: "success",
      message: "user is sign up",
      data: user,
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
