/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
	 _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },
	create : function(req, res) {
		console.log("In create blog")
		var params = req.body;
		params.content = params.content.replace(/\r?\n/g, "<br />");

		Blog.create(params).exec(function(err, blog){
			if(err) {
				return res.json(responseHandler.sendResponseJSON("error", "Could not create new blog."));
			}
			else{
				return res.json(responseHandler.sendResponseJSON("success", "Successfully created a new blog.", {
					blog : blog
				}));
			}
		});
	},
	find : function (req, res) {
		var id = req.param('id');
		if(id){
			Blog.findOne({id : id}).populate("author").exec(function (err, blog) {
				if(err || !blog) {
					return res.json(responseHandler.sendResponseJSON("error", "Could not find the requested blog."));
				} 
				else {
					Comment.find({blog : blog.id}).populate("user").exec(function (err, comments) {
						return res.json(responseHandler.sendResponseJSON("success", "Successfully retrieved the requested blog.", {
							blog : blog, 
							comments : comments 
						}));
					})
				}
			});
		}
		else {
			Blog.find().populate("author").exec(function (err, blogs){
				if(err){
					return res.json(responseHandler.sendResponseJSON("error", "Could not retrieve blogs."));
				}
				else{
					return res.json(responseHandler.sendResponseJSON("success", "Successfully retrieved all blogs.", {
						blogs : blogs
					}));
				}
			});
			
		}
	},
	update : function(req, res) {
		var params = req.body;
		params.content = params.content.replace(/\r?\n/g, "<br />");

		Blog.update({id : params.id, author : params.author}, params).exec(function(err, blog){
			if(err){
				return res.json(responseHandler.sendResponseJSON("error", "Could not update the blog. Some error occurred."));
			}
			else{
				return res.json(responseHandler.sendResponseJSON("success", "Successfully updated blog.", {
					blog : blog
				}));
			}
		});
	},
	destroy : function(req, res) {
		var id = req.param('id');
		Blog.destroy({id : id}).exec(function(err, blogs){
			if(err){
				return res.json(responseHandler.sendResponseJSON("error", "Could not delete blog. Some error occurred."));
			}
			else{
				var blog = blogs[0];
				Comment.destroy({blog: blog.id }).exec(function(err, comments){
					return res.json(responseHandler.sendResponseJSON("success", "Successfully deleted blog and its comments.", {
						blog : blog,
						comments : comments
					}));
				});
			}
		});
	}
};

