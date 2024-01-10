let serviceDo=require("../model/service")

exports.allservice = async function (req, res, next) {
  try {
    let data = await serviceDo.find().populate(["category","userId"]);
    res.status(200).json({
      status: "success",
      message: "service all",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.userallservice = async function (req, res, next) {
  try {
    let data = await serviceDo.find({userId:req.userId}).populate(["category","userId"]);
    res.status(200).json({
      status: "success",
      message: "service all",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.singleservice = async function (req, res, next) {
  try {
    let data = await serviceDo.findById(req.params.id)
    res.status(200).json({
      status: "success",
      message: "service all",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.userallservice = async function (req, res, next) {
  try {
    let data = await serviceDo.find({userId:req.userId}).populate(["category","userId"]);
    res.status(200).json({
      status: "success",
      message: "service all",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.addservice = async function (req, res, next) {
  try {
    req.body.image = req.file.filename;               
    if (!req.body.title || !req.body.image||!req.body.description) {
      throw new Error("!please check a feilds");
    }
    let data = await serviceDo.create({
      image: req.body.image,
      title: req.body.title,
      description:req.body.description,
      category:req.body.category,
      userId:req.userId
    });
    res.status(201).json({
      status: "success",
      message: "service add",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateservice = async function (req, res, next) {
  try {
    let id=req.query.id
    req.body.image = req.file.filename;

    let data = await serviceDo.findByIdAndUpdate(id, {
      image: req.body.image,
      title: req.body.title,
      description:req.body.description,
      category:req.body.category,
      userId:req.userId
    });
    let updatedata = await serviceDo.findByIdAndUpdate(id);
    res.status(200).json({
      status: "success",
      message: "service update",
      data: updatedata,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.deleteservice = async function (req, res, next) {
  try {
    let data = await serviceDo.findByIdAndDelete(req.params.id);
    console.log("data===",data);
    res.status(200).json({
      status: "success",
      message: "service delete",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
