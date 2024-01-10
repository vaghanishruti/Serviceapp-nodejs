let categoryDo = require("../model/categories");

exports.allcategory = async function (req, res, next) {
  try {
    let data = await categoryDo.find();
    res.status(200).json({
      status: "success",
      message: "category all",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.addcategory = async function (req, res, next) {
  try {
    req.body.image = req.file.filename;
    if (!req.body.title || !req.body.image) {
      throw new Error("!please check a feilds");
    }
    let data = await categoryDo.create({
      image: req.body.image,
      title: req.body.title,
    });
    res.status(201).json({
      status: "success",
      message: "category add",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updatecategory = async function (req, res, next) {
  try {
    let id=req.query.id
    req.body.image = req.file.filename;

    let data = await categoryDo.findByIdAndUpdate(id, {
      image: req.body.image,
      title: req.body.title,
    });
    let updatedata = await categoryDo.findByIdAndUpdate(id);
    res.status(200).json({
      status: "success",
      message: "category update",
      data: updatedata,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.deletecategory = async function (req, res, next) {
  try {
    let data = await categoryDo.findByIdAndDelete(req.query.id);
    res.status(200).json({
      status: "success",
      message: "category delete",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
