/**
* Blog.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {

  attributes: {
  	title : {
  		type : "string",
  		required : true
  	},
  	content : {
  		type : "text",
      required : true
  	},
    author : {
      model : "user",
      columnName : "authorId",
      required : true
    },
    tags : {
      collection : 'tag',
      via : 'blogs'
    }
  },
  tableName : 'blogs'
};

