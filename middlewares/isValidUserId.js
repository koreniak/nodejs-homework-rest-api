const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

const isValidUserId = (req, res, next) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    next(HttpError(400, `${userId} is not a valid id`));
  };

  next();
};

module.exports = isValidUserId;