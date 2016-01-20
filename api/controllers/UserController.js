/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require("bcrypt");
module.exports = {
	create : function (req, res) {
		if(req.body.password != req.body.conf_password){
			return res.json(responseHandler.sendResponseJSON("error", "Could not create new user. Validation error."));	
		}
		User.create(req.body).exec(function(err, user) {
			if (err){
				return res.json(responseHandler.sendResponseJSON("error", "Could not create new user."));	
			}
			else{
				req.logIn(user, function(err) {
	                if(err){
						return res.json(responseHandler.sendResponseJSON("error", "Could not log in as new user."));	
					}
					else{
						return res.json(responseHandler.sendResponseJSON("success", "User registration successful.", {
							user : user,
                            token : jwToken.issueToken({id : user.id})
						}));	
					}
	            });		
			}
		});
	},
	find : function (req, res) {
		var id = req.param("id");
		if(id){
			User.findOne({ id : id }).exec(function (err, user){
				if(err || !user){
					return res.json(responseHandler.sendResponseJSON("error", "Could not find the requested user."));
				}
				else{
					Blog.find({ author : id }).exec(function (err, blogs){
						return res.json(responseHandler.sendResponseJSON("success", "Successfully retrieved the requested user.", {
							user : user,
							blogs : blogs
						}));	
					});
				}
			});
		}
		else{
			User.find().exec(function(err, users){
				if(err){
					return res.json(responseHandler.sendResponseJSON("error", "Could not retrieve users."));
				}
				else{
					return res.json(responseHandler.sendResponseJSON("success", "Successfully retrieved all users.", {
						users : users
					}));
				}
			});
		}

	},
	destroy : function (req, res) {

	},
	update : function(req, res){
		var params = req.body;
		if(params.password != params.conf_password){
			return res.json(responseHandler.sendResponseJSON("error", "Could not update user password. Passwords are not matching."));	
		}
		User.findOne({id: params.id}).exec(function(err, user){
			if(params.old_password){
				var match = bcrypt.compareSync(params.old_password, user.password);
				if(!match){
					return res.json(responseHandler.sendResponseJSON("error", "Wrong password."));
				}
			}
			User.update({id: params.id}, params).exec(function(err, user){
				if(err){
					return res.json(responseHandler.sendResponseJSON("error", "Could not update user details."));
				}
				else{
					return res.json(responseHandler.sendResponseJSON("success", "Successfully updated user details", {
						user : user	
					}));
				}
			});
		});
	}
};

