const fs = require("fs/promises");

const services = require("../services");

module.exports.getProfileInfo = async (req, res, next) => {
  try {
    const profile = await services.profile.findProfileInfoByUserId(req.user.id);
    delete profile.password;
    res.status(200).send(profile);
  } catch (error) {
    next(error);
  }
};

module.exports.updateProfileInfo = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.profileImage = await services.upload.upload(req.file.path);
      fs.unlink(req.file.path);
    }

    const profile = await services.profile.updateProfileInfoByUserId(
      req.user.id,
      req.body
    );
    delete profile.password;
    res.status(200).send({ message: "Profile saved", profile });
  } catch (error) {
    next(error);
  }
};
