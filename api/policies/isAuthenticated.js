module.exports = function (req, res, next) {
  if (req.user && req.user.id) {
    return next();
  } else {
    return res.json(401, responseHandler.sendResponseJSON('error', 'Authentication required.'));  
  }
}