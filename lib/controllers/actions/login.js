'use strict';

var method = require('../../waterlock-ldap-auth');
var ldap = method.ldap;
var connection = method.connection;

/**
 * Login action
 */
module.exports = function(req, res) {
  
  var params = req.params.all();
  
  if (typeof params.username === 'undefined' || typeof params.password === 'undefined') {
    waterlock.cycle.loginFailure(req, res, null, {error: 'Invalid username or password'});
  } else {
    var auth = new ldap(connection);
    console.log("User attributes: %j", waterlock.User.attributes);
    auth.authenticate(params.username, params.password, function(err, user) {
      if (err) {
        waterlock.cycle.loginFailure(req, res, user, {error: 'Invalid username or password'});
      } else {
        var criteria = {
          username: params.username
        };
        var attr = {
          username: params.username,
          entryUUID: user
        };
        waterlock.engine.findOrCreateAuth(criteria, attr).exec(function(err, user) {
          if (err) {
            waterlock.cycle.loginFailure(req, res, null, {error: 'user not found'});
          } else {
            waterlock.cycle.loginSuccess(req, res, user);
          }
        });
      }
    });
  }
};
