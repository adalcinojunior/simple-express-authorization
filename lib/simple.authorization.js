'use strict'

const USERSCOPESLOCATION = require('./config/enums').USERSCOPESLOCATION
const LOGICALSTRATEGY = require('./config/enums').LOGICALSTRATEGY
const FLOWSTRATEGY = require('./config/enums').FLOWSTRATEGY
const configurationsDefault = require('./config/default')
const validator = require('./validator')
const propertyExtract = require('./property.extractor')

let configurations = configurationsDefault

const config = (localConfigurations) => {
    configurations = validator(localConfigurations)
}

const check = (expectedScopes, localConfigurations) => {
    if (localConfigurations) {
        configurations = validator(localConfigurations)
    }
    return (req, res, next) => {
        if (!expectedScopes) {
            return next()
        }
        if (Array.isArray(expectedScopes) && expectedScopes.length === 0) {
            return next()
        }
        if (!Array.isArray(expectedScopes)) {
            throw new Error('Expected scopes must be passed in the form of a array, verify the check() function!')
        }

        let userScopes = []
        if (configurations.userScopesLocation === USERSCOPESLOCATION.DEFAULT) {
            if (!req.user || !req.user.scope) {
                throw new Error('You are using the default userScopeLocation, but req.user.scope is undefined.')
            }
            userScopes = req.user.scope
        }
        else {
            userScopes = propertyExtract(req, configurations.userScopesLocation)
        }

        let accepted = false;

        if (configurations.logicalStrategy === LOGICALSTRATEGY.AND) {
            accepted = expectedScopes.every(scope => userScopes.includes(scope))
        } else {
            accepted = expectedScopes.some(scope => userScopes.includes(scope))
        }

        if (!accepted) {
            if (configurations.flowStrategy === FLOWSTRATEGY.NEXTWITHERROR) {
                return next(configurations.responseCaseError)
            }
            return res.status(403).send(configurations.responseCaseError)
        }
        return next()
    }
}

module.exports = {
    config,
    check
}