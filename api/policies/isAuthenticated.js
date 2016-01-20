module.exports = function(req, res, next){
	console.log("Checking for Authentication")
	if(req.headers && req.headers.authorization){
		var parts = req.headers.authorization.split(" ");
		if(parts.length == 2 && /^Bearer$/i.test(parts[0])){
			token = parts[1];
		}
		else{
			return res.json(401, responseHandler.sendResponseJSON("error", "Authentication failure."));	
		}
	}
	else if(req.param("token")){
		token = req.param("token");
		//delete req.query.token;
	}
	else{
		return res.json(401, responseHandler.sendResponseJSON("error", "Authorization required."));	
	}

	jwToken.verifyToken(token, function(err, token){
		if(err){
			return res.json(401, responseHandler.sendResponseJSON("error", "Token invalid."));	
		}
		else{
			console.log(token)
			req.token = token;
			next();
		}
	});
}