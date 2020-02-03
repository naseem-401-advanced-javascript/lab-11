'use strict';

module.exports = (req, res, next) => {
  console.log(' request Information => ',req.method, req.path);
  next();
};