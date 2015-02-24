'use strict';

var path = require('path');
var LdapAuth = require('ldapauth-fork');

exports.authType = 'ldap';

/**
 * [installPath description]
 * @type {[type]}
 */
exports.installPath = path.normalize(__dirname+'/../../../');

/**
 * Conditionally export mail trasport data if
 * user has opted for password tokens i.e. password
 * resets
 */
var configPath = path.normalize(__dirname+'/../../../config/waterlock.js');
var wlconfig = require(configPath).waterlock;
var method = {};
if(typeof wlconfig.authMethod[0] === 'object'){
  for(var i = 0; i < wlconfig.authMethod.length; i++){
    if(wlconfig.authMethod[i].name === 'waterlock-ldap-auth'){
      method = wlconfig.authMethod[i];
    }
  }
}else{
  method = wlconfig.authMethod;
}

/**
 * the entire config
 */
exports.config = wlconfig;

/**
 * the config for this method
 */
exports.authConfig = method;

/**
 * the LDAP connection to authenticate with
 */
exports.ldapAuth = new LdapAuth(method.connection);

/**
 * [actions description]
 * @type {[type]}
 */
exports.actions = require('./controllers');

/**
 * [model description]
 * @type {[type]}
 */
exports.model = require('./models');
