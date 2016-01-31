/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : function (req, res) {
		Comment.find().populateAll().exec(function (err, comments){
			if(err){
				return res.json(responseHandler.sendResponseJSON("error", "Could not retrieve comments."));
			}
			else{
				return res.json(responseHandler.sendResponseJSON("success", "Successfully retrieved all comments.", {
					comments : comments
				}));
			}
		});

	},
	find : function (req, res) {
		var id = req.param('id');
		Comment.findOne({id : id}).populateAll().exec(function (err, comment) {
			if(err || !comment) {
				return res.json(responseHandler.sendResponseJSON("error", "Could not find the requested comment."));
			} 
			else {
				return res.json(responseHandler.sendResponseJSON("success", "Successfully retrieved the requested comment.", {
					comment : comment 
				}));
			}
		});
	},
	create : function (req, res) {
		Comment.create(req.body).exec(function (err, comment) {
			if (err){
				return res.json(responseHandler.sendResponseJSON("error", "Could not create new comment."));	
			}
			else{
				return res.json(responseHandler.sendResponseJSON("success", "Comment posted successfully.", {
					comment : comment
				}));
			}
		})		 		
	},
	delete : function(req, res){
		var id = req.param("id");
		Comment.destroy({id : id}).exec(function(err, comment){
			if(err){
				return res.json(responseHandler.sendResponseJSON("error", "Could not delete the comment."));
			}
			else{
				return res.json(responseHandler.sendResponseJSON("success", "Comment deleted successfully.", {
					comment : comment
				}));
			}
		});
	}
};

