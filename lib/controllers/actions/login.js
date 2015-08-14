'use strict';

var _ = require('lodash');
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
    auth.authenticate(params.username, params.password, function(err, user) {
      if (err) {
        waterlock.cycle.loginFailure(req, res, user, {error: 'Invalid username or password'});
      } else {
        var criteria = {
          username: params.username
        };
        var attr = {
          username: params.username,
          entryUUID: user.entryUUID,
          dn: user.dn
        };
        _.forOwn(method.attributes, function(fields, oid) {
          _.forOwn(fields, function(definition, name) {
            if (user.hasOwnProperty(oid)) {
              attr[name] = user[oid];
            }
          });
        });
        waterlock.engine.findOrCreateAuth(criteria, attr, function(err, user) {
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
