module.exports = function(req, res, next){
	Comment.findOne({ id : req.param("id") }).exec(function(err, comment){
		if(comment && comment.user == req.token.id){
			return next();
		}
		else{
			return res.json(responseHandler.sendResponseJSON("error", "You don't have permissions to do this action."));
		}
	})
}