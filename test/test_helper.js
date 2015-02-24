var proxyquire =  require('proxyquire')
  , should = require('should')
  , path = require('path')
  , waterlockPath = path.normalize(__dirname+'/waterlock.js')

var pathStub = {
  normalize: function(str){
    return waterlockPath;
  }
}

exports.waterlock_ldap = proxyquire.noCallThru().load('../lib/waterlock-ldap-auth', 
  { 
    'path': pathStub
  });

exports.proxyquire = proxyquire;
exports.should = should;
