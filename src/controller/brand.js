const services = require("../services");

const fs = require("fs/promises");

module.exports.getAll = async (req, res, next) => {
  try {
    const data = await services.brand.getAll();
    res.json({
      message: "Get All Brand Complete",
      data,
    });
  } catch (err) {
    next(err);
  }
  return;
};

module.exports.getOne = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const data = await services.brand.getBrandById(+brandId);
    res.json({
      message: "Get One Brand Complete",
      data,
    });
  } catch (err) {
    next(err);
  }
  return;
};

module.exports.addBrand = async (req, res, next) => {
  try {
    console.log(req.file, "check file");
    if (req.file) {
      req.body.brandImage = await services.upload.upload(req.file.path);
      fs.unlink(req.file.path);
    }

    const data = await services.brand.createBrand(req.body);

    res.status(200).json({
      message: "Create Brand Complete",
      data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
  return;
};

module.exports.editBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    console.log(req.file, req.body, "try upload");
    if (req.file) {
      req.body.brandImage = await services.upload.upload(req.file.path);
      fs.unlink(req.file.path);
    }
    const data = await services.brand.updateBrand(+brandId, req.body);

    res.json({
      message: "Update Brand Complete",
      data,
    });
  } catch (err) {
    next(err);
  }
  return;
};

module.exports.deleteBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    console.log(+brandId);
    await services.brand.removeBrand(+brandId);
    res.json({
      message: "Delete Brand Complete",
    });
  } catch (err) {
    next(err);
  }
  return;
};
