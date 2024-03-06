const services = require("../services");

const fs = require("fs/promises");

module.exports.getAll = async (req, res, next) => {
  try {
    const data = await services.watch.getAllWatch();
    res.json({
      message: "Get All Watch Complete",
      data,
    });
  } catch (err) {
    next(err);
  }
  return;
};

module.exports.getOne = async (req, res, next) => {
  try {
    const { watchId } = req.params;
    const data = await services.watch.getWatchById(+watchId);
    data.brand = data.brand.name
    res.json({
      message: "Get One Watch Complete",
      data,
    });
  } catch (err) {
    next(err);
  }
  return;
};

module.exports.createWatch = async (req, res, next) => {
  //เหลือต้องมาใส่formDataกับuploadรูป ถ้
  try {
    if (req.file) {
      req.body.watchImage = await services.upload.upload(req.file.path);
      fs.unlink(req.file.path);
    }

    const rs = { ...req.body, brandId: +req.body.brandId };

    const data = await services.watch.addWatch(rs);
    res.json({
      message: "Create Watch Complete",
      data,
    });
  } catch (err) {
    next(err);
  }
  return;
};

module.exports.editWatch = async (req, res, next) => {
  try {
    const { watchId } = req.params;
    if (req.file) {
      req.body.watchImage = await services.upload.upload(req.file.path);
      fs.unlink(req.file.path);
    }
    const data = await services.watch.updateWatch(+watchId, req.body);
    res.json({
      message: "Update Watch Complete",
      data,
    });
  } catch (err) {
    next(err);
  }
  return;
};

module.exports.deleteWatch = async (req, res, next) => {
  try {
    const { watchId } = req.params;
    await services.watch.removeWatch(+watchId);
    res.json({
      message: "Delete Watch Complete",
    });
  } catch (err) {
    next(err);
  }
  return;
};
