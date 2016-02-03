
module.exports = {
  init: function (cb) {

    RBAC = require('rbac');
    rbac = new RBAC(sails.config.connections.MySQLDb)
    var roles = ['admin', 'user', 'tagModerator', 'commentModerator', 'reporter', 'guest', 'administrative'];

    var permissions = {
      user          : ['create', 'delete', 'update', 'find', 'index'],
      blog          : ['create', 'update', 'delete', 'find', 'index'],
      comment       : ['delete', 'create', 'find', 'index'],
      report        : ['generate'],
      tag           : ['delete', 'create', 'find', 'index'],
      authentication: ['login', 'logout']
    };

    var grants = {
      administrative  : ['index_blog', 'index_user', 'index_tag', 'index_comment'],
      guest           : ['index_blog', 'index_tag', 'find_blog', 'find_comment', 'login_authentication', 'create_user'],
      reporter        : ['administrative', 'generate_report'],
      tagModerator    : ['administrative', 'find_blog', 'find_tag'],
      commentModerator: ['index_comment', 'delete_comment'],
      user            : ['guest', 'update_user', 'create_blog', 'update_blog', 'delete_blog', 'create_comment', 'delete_comment', 'find_tag'],
      admin           : ['user', 'administrative', 'find_user', 'delete_user', 'update_user', 'create_tag', 'delete_tag']
    };

    rbac.create(roles, permissions, grants, function (err, data) {
      if (err) {
        console.log(err)
        return false;
      } else {
        console.log(data)
        cb();
      }
    });  
  } 
}