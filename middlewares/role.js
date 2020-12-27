const User = require('../models/User');

const role = {};

role.isAdmin = (req, res, next) => {
  User.findById(req.user).then((user) => {
    if (user.role !== 'admin') {
      return res
        .status(403)
        .send({ message: 'Access denied. You are not authorized.' });
    }
    next();
  });
};

role.isSeller = (req, res, next) => {
  User.findById(req.user).then((user) => {
    if ((user.role !== 'seller') & (user.role !== 'admin')) {
      return res
        .status(403)
        .send({ message: 'Access denied. You are not authorized.' });
    }
    next();
  });
};

module.exports = role;
