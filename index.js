'use strict'

const simpleAuthorization = require('./lib/simple.authorization')

module.exports.config = function (configurations) {
    return simpleAuthorization.config(configurations)
}

module.exports.check = function (expectedScopes, localConfigurations) {
    return simpleAuthorization.check(expectedScopes, localConfigurations)
}