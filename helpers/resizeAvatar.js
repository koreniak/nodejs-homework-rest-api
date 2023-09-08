const Jimp = require('jimp');
const HttpError = require('./HttpError');

const resizeAvatar = async (avatarDir) => {
    try {
      const avatar = await Jimp.read(avatarDir);
      await avatar.cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
      await avatar.writeAsync(avatarDir);

      return avatar;
    } catch (error) {
      throw HttpError(400, error.message);
    }
};

module.exports = resizeAvatar;