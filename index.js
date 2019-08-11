'use strict'

const simpleAuthorization = require('./lib/simple.authorization')

exports = module.exports = function (configurations) {
    return simpleAuthorization.config(configurations)
}

exports = module.exports = function (expectedScopes, localConfigurations) {
    return simpleAuthorization.check(expectedScopes, localConfigurations)
}