
var jwt = require('jsonwebtoken');

module.exports = {
  issueToken: function (payload) {
    return jwt.sign(payload, sails.config.tokenSecret, {
      expiresIn: 300
    });
  },
  verifyToken: function (token, callback) {
    return jwt.verify(token, sails.config.tokenSecret, {}, callback);
  }
}