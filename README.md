# Waterlock LDAP Auth

[![Build Status](http://img.shields.io/travis/waterlock/waterlock-ldap-auth.svg?style=flat)](https://travis-ci.org/waterlock/waterlock-ldap-auth)
[![NPM version](http://img.shields.io/npm/v/waterlock-ldap-auth.svg?style=flat)](http://badge.fury.io/js/waterlock-ldap-auth)
[![Dependency Status](http://img.shields.io/gemnasium/fladi/waterlock-ldap-auth.svg?style=flat)](https://gemnasium.com/fladi/waterlock-ldap-auth)

waterlock-ldap-auth is a module for [waterlock](http://waterlock.ninja/)
providing a LDAP authentication method for users based on customizeable LDAP
queries.

## Usage

```bash
npm install waterlock-ldap-auth
```

set the following option in your `waterlock.js` config file

```js
authMethod:[
	{
		name: "waterlock-ldap-auth",
		connection: {
    url: "ldaps://ldap.example.com:636",
      bindDn: "uid=myadminusername,ou=users,o=example.com",
      bindCredentials: "mypassword",
      searchBase: "ou=users,o=example.com",
      searchFilter: "(uid={{username}})",
      cache: true
    }
	}
]
```

## Auth Model
Local auth adds the following attributes onto the Auth model

```js
  entryUUID: {
    type: 'string',
    unique: true
  }
```
with the way waterlock is designed and this model you can override any of these
attributes.

waterlock-ldap-auth will create a new Auth and User if LDAP authentication
succeeds but no Auth/User is found.
