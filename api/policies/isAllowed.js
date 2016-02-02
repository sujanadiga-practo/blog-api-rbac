module.exports = function(req, res, next){
	var userId;
	if(req.user){
		userId = req.user.id;
	}
	var resource = req.path;
	var controller = req.options.controller;
	var action = req.options.action;
	var role;

	console.log(userId, resource, controller, action)

	User.findOne({id : userId}).exec(function (err, user){
		if(user) {
			role = user.role;
			req.user.role = role;
		}
		else role = "guest";

		rbac.can(role, action, controller, function (err, allowed){
			console.log(err, allowed)
			if(allowed){
				// If any tag moderator is trying to see other tags
				if(role == "tagModerator" && controller == "tag" && action == "find" && req.param("id") != user.tagMaintained.id){
				}
				else{
					return next();
				}
			}
			else{
				// Some passes,
				// Any user can see and upadate his own profile
				if( userId == req.param("id") && controller == "user" && (action == "update" || action == "find")){
					return next();
				}
			}
			return res.json(responseHandler.sendResponseJSON("error", "You do not have permissions to do this action."));
		});
	});
	
}