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
  db.createTable("tags", {
    id : {
      type : "int",
      primaryKey : true,
      autoIncrement : true,
      unsigned : true,
      notNull : true
    },
      tag : {
        type : "string",
      notNull : true,
      },
    description : {
        type : "text"
      },
      createdAt : "datetime",
      updatedAt : "datetime"
      
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable("tags", callback); 
};