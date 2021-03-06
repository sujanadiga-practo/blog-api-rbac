/**
* Tag.js
*
* @description:: TODO: You might write a short summary of how this model works and what it represents here.
* @docs       :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    tag: {
      type    : 'string',
      required: true
    },
    description: {
      type: 'text'
    },
    blogs: {
      collection: 'blog',
      via       : 'tags'
    }
  },
  tableName: 'tags'
};