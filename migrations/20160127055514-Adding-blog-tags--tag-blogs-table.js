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
  db.createTable("blog_tags__tag_blogs", {
    id : {
      type : "int",
      primaryKey : true,
      autoIncrement : true,
      unsigned : true,
      notNull : true
    },
      blog_tags : {
        type : "int",
      unsigned : true,
      notNull : true
      },
    tag_blogs : {
        type : "int",
      unsigned : true,
      notNull : true
      }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable("blog_tags__tag_blogs", callback); 
};