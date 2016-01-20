module.exports = function(req, res, next){
	if(req.token.id == req.param("id")){
		return next();
	}
	else{
		return res.json(responseHandler.sendResponseJSON("error", "You don't have permissions to do this action."));
	}
}