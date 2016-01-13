module.exports = function(req, res, next){
	if(req.user && req.user.id == req.param("id")){
		return next();
	}
	else{
		req.flash("message", "You don't have permissions to do this action.");
		req.flash("type", "warning");

		return res.redirect("/");
	}
}