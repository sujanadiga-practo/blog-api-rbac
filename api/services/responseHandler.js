module.exports = {
	sendResponseJSON : function (status, message, payload){
		return {
			status : status,
			message : message,
			payload : payload
		};
	}

};