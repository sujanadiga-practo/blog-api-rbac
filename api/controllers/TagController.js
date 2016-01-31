/**
 * TagController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : function (req, res) {
		Tag.find().exec(function (err, tags){
			if(err){
				return res.json(responseHandler.sendResponseJSON("error", "Could not retrieve tags."));
			}
			else{
				return res.json(responseHandler.sendResponseJSON("success", "Successfully retrieved all tags.", {
					tags : tags
				}));
			}
		});
	},
	find : function (req, res) {
		var id = req.param('id');
		Tag.findOne({id : id}).exec(function (err, tag) {
			if(err || !tag) {
				return res.json(responseHandler.sendResponseJSON("error", "Could not find the requested tag."));
			} 
			else {
				return res.json(responseHandler.sendResponseJSON("success", "Successfully retrieved the requested tag.", {
					tag : tag 
				}));
			}
		});
	},
	create : function (req, res) {
		Tag.create(req.body).exec(function (err, tag) {
			if (err){
				return res.json(responseHandler.sendResponseJSON("error", "Could not create new tag."));	
			}
			else{
				return res.json(responseHandler.sendResponseJSON("success", "Tag created successfully.", {
					tag : tag
				}));
			}
		})		 		
	},
	delete : function(req, res){
		var id = req.param("id");
		Tag.destroy({id : id}).exec(function(err, tag){
			if(err){
				return res.json(responseHandler.sendResponseJSON("error", "Could not delete the tag."));
			}
			else{
				return res.json(responseHandler.sendResponseJSON("success", "Tag deleted successfully.", {
					tag : tag
				}));
			}
		});
	}
};

