/**
 * AuthenticationController
 *
 * @description :: Server-side logic for managing Authentications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
	login : function(req, res){
        sails.log.debug("Server side Authentication in progress")
	 	passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.json(responseHandler.sendResponseJSON("error", info.message || "Authentication failure."));   
            }
            else{
                sails.log.debug("Authentication successful")
           		req.logIn(user, function(err) {
                    if (err){
                        return res.json(responseHandler.sendResponseJSON("error", "Log in failed."));   
                    }
                    else{
                        return res.json(responseHandler.sendResponseJSON("success", "Log in successful.", {
                            user : user,
                            token : jwToken.issueToken({id : user.id})
                        }));   
                    }
	            });
            }
           
        })(req, res);
    },
	logout : function(req, res){
        req.logout();
        return res.json(responseHandler.sendResponseJSON("success", "You have successfully logged out."));
    }
};

