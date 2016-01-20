module.exports = function(req, res, next){

	Blog.findOne({ id : req.param("id") }).exec(function(err, blog){
		if(blog && blog.author == req.token.id){
			return next();
		}
		else{
			return res.json(responseHandler.sendResponseJSON("error", "You must be owner of the blog to do this action."));
		}
	})

}