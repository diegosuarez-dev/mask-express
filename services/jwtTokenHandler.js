const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

const tokenHandler = {};

tokenHandler.createToken = (user) => {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  };
  return jwt.encode(payload, config.SECRET_TOKEN);
};

tokenHandler.decodeToken = (token) => {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);
      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'Your token has expired.',
        });
      }
      resolve(payload.sub);
    } catch (error) {
      reject({
        status: 500,
        message: 'Invalid token.',
      });
    }
  });
  return decoded;
};

module.exports = tokenHandler;
