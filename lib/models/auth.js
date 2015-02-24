'use strict';

var _  = require('lodash');

exports.attributes = function(attr){
  var template = {
    entryUUID: {
      type: 'string',
      unique: true
    }
  };

  _.merge(template, attr);
  _.merge(attr, template);
};
