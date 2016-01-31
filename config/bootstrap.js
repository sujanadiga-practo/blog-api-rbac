/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  /*
  acl = require("acl");
  acl = new acl(new acl.memoryBackend());

  acl.allow('admin', 'user', 'find');
  acl.allow('admin', 'user', 'index');
  acl.allow('admin', 'user', 'delete');
  */
  // rbac = new RBAC(sails.config.connections.MySQLDb);
  // // rbac = new RBAC();
  
  // var roles = [];
  // var permissions = [];

  // rbac.create(roles, permissions, function(err, response) {
  //   if(err) {
  //       throw err; //process error
  //   }

  // });
    
    rules.init(cb);
};
