'use strict';

var dbm;
var type;
var seed;

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
	db.createTable("blogs", {
		id : {
			type : "int",
			primaryKey : true,
			autoIncrement : true,
			unsigned : true,
			notNull : true
		},
		title : {
	  		type : "string",
		  	notNull : true
	  	},
	  	content : {
	  		type : "text",
		  	notNull : true
	  	},
	    authorId : {
	 	    type : "int",
			unsigned : true,
			notNull : true
	    },
	    createdAt : "datetime",
	    updatedAt : "datetime"
	    
	}, function () {
		db.addIndex("blogs", "indexBlogsOnAuthor", "authorId", callback);
	});
};

exports.down = function(db, callback) {
	db.dropTable("blogs", callback);	
};
