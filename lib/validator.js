'use strict'

const optionsDefault = require('./config/default')
/**
 * Function to validate configured parameters
 * @param {*} configOptions 
 */
module.exports = (configOptions) => {
    /**
     * If no settings are entered, the default settings are used.
     */
    if (!configOptions) return optionsDefault

    /**
     * Passing strings to uppercase
     */
    if (configOptions.logicalStrategy && typeof configOptions.logicalStrategy === 'string') {
        configOptions.logicalStrategy = configOptions.logicalStrategy.toUpperCase()
    }

    if (configOptions.flowStrategy && typeof configOptions.flowStrategy === 'string') {
        configOptions.flowStrategy = configOptions.flowStrategy.toUpperCase()
    }


    const optionsReturn = Object.assign({}, configOptions)


    /**
     * If the userScopesLocation property has not been entered, the default userScopesLocation is used.
     */
    if (!configOptions.userScopesLocation || typeof configOptions.userScopesLocation !== 'string') {
        optionsReturn.userScopesLocation = optionsDefault.userScopesLocation
    }

    /**
     * If the logicalStrategy property has not been entered, the default logicalStrategy is used.
     */
    if (!configOptions.logicalStrategy || typeof configOptions.logicalStrategy !== 'string') {
        optionsReturn.logicalStrategy = optionsDefault.logicalStrategy
    }

    /**
    * If the responseCaseError property has not been entered, the default responseCaseError is used.
    */
    if (!configOptions.responseCaseError) optionsReturn.responseCaseError = optionsDefault.responseCaseError

    /**
    * If the flowStrategy property has not been entered, the default flowStrategy is used.
    */
    if (!configOptions.flowStrategy || typeof configOptions.flowStrategy !== 'string') {
        optionsReturn.flowStrategy = optionsDefault.flowStrategy
    }

    /**
     * If the logicalStrategy property is not AND or is not OR, the default logicalStrategy is used.
     */
    if (
        configOptions.logicalStrategy !== "AND" &&
        configOptions.logicalStrategy !== "OR"
    ) {
        optionsReturn.logicalStrategy = optionsDefault.logicalStrategy
    }

    /**
    * If the flowStrategy property is not RETURNRESPONSE or is not NEXTWITHERROR, the default flowStrategy is used.
    */
    if (
        configOptions.flowStrategy !== "RETURNRESPONSE" &&
        configOptions.flowStrategy !== "NEXTWITHERROR"
    ) {
        optionsReturn.flowStrategy = optionsDefault.flowStrategy
    }

    return optionsReturn
}