const tokenHandler = require('../services/jwtTokenHandler');

const auth = {};

auth.isAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: 'Access denied. You are not authorized.' });
  }
  const token = req.headers.authorization.split(' ')[1];

  tokenHandler
    .decodeToken(token)
    .then((response) => {
      req.user = response;
      next();
    })
    .catch((response) => {
      res.status(response.status);
    });
};

module.exports = auth;
