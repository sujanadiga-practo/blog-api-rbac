module.exports = function(req, res, next){
	if(req.user && (req.user.role == "admin" || req.user.role == "commentModerator")){
		return next();
	}
	Comment.findOne({ id : req.param("id") }).exec(function(err, comment){
		if(comment && comment.user == req.user.id){
			return next();
		}
		else{
			return res.json(responseHandler.sendResponseJSON("error", "You don't have permissions to do this action."));
		}
	})
}