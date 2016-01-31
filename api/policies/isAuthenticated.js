module.exports = function(req, res, next){
	console.log("Checking for Authentication")
	if(req.user && req.user.id){
		return next();
	}
	else{
		return res.json(401, responseHandler.sendResponseJSON("error", "Authentication required."));	
	}
}