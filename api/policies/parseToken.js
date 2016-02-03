module.exports = function (req, res, next) {
  var token;
  console.log('In token parser.')
  console.log('authorization header : ', req.headers.authorization);
  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
      token = parts[1];
    }
  } else if (req.param('token')) {
    token = req.param('token');
  }

  if (!token || token === 'undefined') return next(); // users hasn't logged in yet

  jwToken.verifyToken(token, function (err, token) {
    if (!err) {
      req.user = token;
      return next();
    } else {
      // user has logged in, but his token expired.
      return res.json(401, responseHandler.sendResponseJSON('error', 'Session expired. Please login again.'));
    }
  });
}