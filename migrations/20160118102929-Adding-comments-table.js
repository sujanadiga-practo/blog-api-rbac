'use strict';

var dbm;
var type;
var seed;
//var async = require("async");
/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
	db.createTable("comments", {
		id : {
			type : "int",
			primaryKey : true,
			autoIncrement : true,
			unsigned : true,
			notNull : true
		},
		message : {
	  		type : "text",
		  	notNull : true
	  	},
	  	blogId : {
	  		type : "int",
			notNull : true,
			unsigned : true
	  	},
	  	userId : {
	  		type : "int",
		  	notNull : true,
			unsigned : true
	  	},
	    createdAt : "datetime",
	    updatedAt : "datetime"
	    
	},  function () {
		async.series([
			db.addIndex.bind(db, "comments", "indexCommentsOnBlog", "blogId"),
			db.addIndex.bind(db, "comments", "indexCommentsOnUser", "userId")
			], callback);
	});
};

exports.down = function(db, callback) {
	db.dropTable("comments", callback);	
};
