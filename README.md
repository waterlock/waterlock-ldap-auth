# Waterlock LDAP Auth

[![Build Status](https://travis-ci.org/OpenServicesEU/waterlock-ldap-auth.svg)](https://travis-ci.org/OpenServicesEU/waterlock-ldap-auth)
[![NPM version](http://img.shields.io/npm/v/waterlock-ldap-auth.svg?style=flat)](http://badge.fury.io/js/waterlock-ldap-auth)
[![Dependency Status](http://img.shields.io/gemnasium/OpenServicesEU/waterlock-ldap-auth.svg?style=flat)](https://gemnasium.com/OpenServicesEU/waterlock-ldap-auth)

waterlock-ldap-auth is a module for [waterlock](http://waterlock.ninja/)
providing a LDAP authentication method for users based on customizeable LDAP
queries. It uses [ldapauth-fork](https://www.npmjs.com/package/ldapauth-fork) to
faciliate LDAP authentication.

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
    },
    attributes: {}
  }
]
```

## Auth Model

LDAP auth adds the following attributes onto the Auth model:

```js
  entryUUID: {
    type: 'string',
    unique: true
  },
  dn: {
    type: 'string',
    unique: true
  }
```

They map the `dn` and the`entryUUID` values of the LDAP user to the `Auth`
model.

With the way waterlock is designed and this model you can override any of these
attributes.

waterlock-ldap-auth will create a new Auth and User if LDAP authentication
succeeds but no Auth/User is found.

## Mapping LDAP attributes

It is possible to map attributes from the LDAP user object to the `Auth` model
automatically. Just add objects to the `attributes` property:

```js
authMethod:[
  {
    name: "waterlock-ldap-auth",
    connection: { ... },
    attributes: {
      uid: {
        uid: {
          type: 'string'
        }
      },
      cn: {
        fullname: {
          type: 'string'
        }
      },
      mail: {
        email: {
          type: 'string'
        }
      }
    }
  }
]
```

This example adds a mapping from LDAP to `Auth` model:

| *LDAP* | *`Auth` model* | *Type* |
|--------|----------------|--------|
| uid    | uid            | string |
| cn     | fullname       | string |
| mail   | email          | string |

## License

**Waterlock LDAP Auth** is licensed under the MIT license. See the LICENSE file
for more details.
