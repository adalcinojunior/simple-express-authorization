# Simple Express Authorization - 
Scopes based authorization middleware.
Ideal for app express or derivative such as express-gateway

[![node](https://img.shields.io/badge/node-v10.16.2-red.svg?style=?style=flat-square&logo=node.js)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-v6.10.3-red.svg?style=flat-square&logo=npm)](https://nodejs.org/)
[![mocha](https://img.shields.io/badge/mocha-v6.2.0-brown.svg?style=flat-square&logo=mocha)](https://www.npmjs.com/package/mocha)
[![chai](https://img.shields.io/badge/chai-v4.2.0-orange.svg?style=flat-square&logo=chai)](https://www.npmjs.com/package/chai)
[![supertest](https://img.shields.io/badge/supertest-v4.2.0-green.svg?style=flat-square&logo=supertest)](https://www.npmjs.com/package/supertest)
[![nyc](https://img.shields.io/badge/nyc-v14.1.1-blue.svg?style=flat-square&logo=nyc)](https://www.npmjs.com/package/nyc)
[![Coverage Status](https://coveralls.io/repos/github/adalcinojunior/simple-express-authorization/badge.svg?branch=master)](https://coveralls.io/github/adalcinojunior/simple-express-authorization?branch=master)
[![Build Status](https://travis-ci.com/adalcinojunior/simple-express-authorization.svg?branch=master)](https://travis-ci.com/adalcinojunior/simple-express-authorization.svg?branch=master)


## Installation

    $ npm i simple-express-authorization

## Usage the simple-express-authorization
### When there is a single setting
```javascript
const app = require('express')
const guard = require('simple-express-authorization')

const settings = {
    responseCaseError: {
        code: 403,
        message: "FORBIDDEN",
        description: "Authorization failed due to insufficient permissions.",
        redirect_link: "/auth"
    },
    logicalStrategy: 'AND',
    flowStrategy: "NEXTWITHERROR"
};

guard.config(settings)

app.get('/users', guard.check(['users:read', 'users:readAll']), () => {
    return [];
}))

app.get('/users/:userId', guard.check(['users:read']), () => {
    return {};
}))
...
```
### When there are local settings
```javascript
const app = require('express')
const guard = require('simple-express-authorization')

const settingsGetAll = {
    responseCaseError: {
        code: 403,
        message: "FORBIDDEN",
        description: "Authorization failed due to insufficient permissions.",
        redirect_link: "/auth"
    },
    logicalStrategy: 'AND',
    flowStrategy: "NEXTWITHERROR"
};

const settingsGet = {
    responseCaseError: {
        code: 403,
        message: "FORBIDDEN",
        description: "Authorization failed due to insufficient permissions.",
        redirect_link: "/auth"
    },
    logicalStrategy: 'AND',
    flowStrategy: "RETURNRESPONSE"
};

guard.config(options)

app.get('/users', guard.check(['users:read', 'users:readAll'],settingsGetAll), () => {
    return [];
}))

app.get('/users/:userId', guard.check(['users:read'],settingsGet), () => {
    return {};
}))
...
```
### Possibles settings
```javascript
settings = {
    /** Specific where we find user scopes
    * By default we use -> req.user.scope
    * Observation: 
    *      - userScopesLocation is a string
    *      - req.user.scope is expected to be of type Array.
    * 
    * When informed "a.b.c" we use -> req['a']['b']['c']
    */
    userScopesLocation: "DEFAULT",

    /** Specifies the logical strategy used to evaluate user scopes
    * By default we use -> OR
    * Observation: 
    *      - logicalStrategy is a string
    *      - We currently only support "OR" and "AND".
    */
    logicalStrategy: "OR",

    /** Specifies the return object if the user does not have the expected scopes.
     *  responseCaseError is the content returned in the response body when flowStrategy
     *  is not modified, or when it is set to the default value "RETURNRESPONSE"
     */
    responseCaseError: {
        code: 403,
        message: "FORBIDDEN",
        description: "Authorization failed due to insufficient permissions.",
        redirect_link: "/auth"
    },

    /** Specifies the flow strategy used when the user does not have the expected scopes
     * By default we use -> RETURNRESPONSE
     * Observation: 
     *      - flowStrategy is a string
     *      - "RETURNRESPONSE"-> When the user does not have the required scopes,
     *      the object responseCaseError is returned.
     *      - "NEXTWITHERROR"-> When the user does not have the required scopes,
     *      the next() function is called passing the responseCaseError object.
     *      -  We currently only support "RETURNRESPONSE" and "NEXTWITHERROR".
     */
    flowStrategy: "RETURNRESPONSE"
}
```

## Running tests

### Unitary tests

Run `npm run test:unit` to execute the unit tests.

### Integration tests

Run `npm run test:integration` to execute the integration tests.

### Coverage tests

Run `npm run test:coverage` to execute the coverage tests.


