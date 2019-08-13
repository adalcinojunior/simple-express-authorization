const assert = require('chai').assert
const validator = require('../../lib/validator')
const configDefault = require('../../lib/config/default')

describe('Module: validator.js', () => {

    describe('Integrity', () => {
        it('should return a function', () => {
            assert.typeOf(validator, 'function', '"validator" is not function type')
        })
    })

    describe('Functionality', () => {
        context('When no setting is passed.', () => {
            it('Must return an object with default settings', () => {
                const configReturned = validator()
                assert.equal(configReturned, configDefault, "Did not return default settings")
            })
        })
        context('When any configuration is passed.', () => {
            it('Passing a type valid userScopesLocation, must return an object with a merge between valid settings and default settings.', () => {
                const configurations = {
                    userScopesLocation: "user.scopes"
                };
                const configExpected = Object.assign({}, configDefault)
                configExpected.userScopesLocation = configurations.userScopesLocation;

                const configReturned = validator(configurations)
                assert.equal(configReturned.userScopesLocation, configExpected.userScopesLocation, "Did not return expected userScopesLocation")
                assert.equal(configReturned.logicalStrategy, configExpected.logicalStrategy, "Did not return expected logicalStrategy")
                assert.equal(configReturned.responseCaseError, configExpected.responseCaseError, "Did not return expected responseCaseError")
                assert.equal(configReturned.flowStrategy, configExpected.flowStrategy, "Did not return expected flowStrategy")
            })

            it('Passing a type invalid userScopesLocation, must return an object with a default userScopesLocation settings.', () => {
                const configurations = {
                    userScopesLocation: {
                        req: {
                            user: {
                                scopes: ""
                            }
                        }
                    }
                };
                const configExpected = Object.assign({}, configDefault)

                const configReturned = validator(configurations)
                assert.notEqual(configReturned.userScopesLocation, configurations.userScopesLocation, "Did not return expected userScopesLocation")
                assert.equal(configReturned.userScopesLocation, configExpected.userScopesLocation, "Did not return expected userScopesLocation")
                assert.equal(configReturned.logicalStrategy, configExpected.logicalStrategy, "Did not return expected logicalStrategy")
                assert.equal(configReturned.responseCaseError, configExpected.responseCaseError, "Did not return expected responseCaseError")
                assert.equal(configReturned.flowStrategy, configExpected.flowStrategy, "Did not return expected flowStrategy")
            })


            it('Passing valid logicalStrategy, must return an object with a merge between valid settings and default settings.', () => {
                const configurations = {
                    logicalStrategy: "AND"
                };
                const configExpected = Object.assign({}, configDefault)
                configExpected.logicalStrategy = configurations.logicalStrategy;

                const configReturned = validator(configurations)
                assert.equal(configReturned.userScopesLocation, configExpected.userScopesLocation, "Did not return expected userScopesLocation")
                assert.equal(configReturned.logicalStrategy, configExpected.logicalStrategy, "Did not return expected logicalStrategy")
                assert.equal(configReturned.responseCaseError, configExpected.responseCaseError, "Did not return expected responseCaseError")
                assert.equal(configReturned.flowStrategy, configExpected.flowStrategy, "Did not return expected flowStrategy")
            })

            it('Passing a value invalid logicalStrategy, must return an object with a default logicalStrategy settings.', () => {
                const configurations = {
                    logicalStrategy: "XOR"
                };
                const configExpected = Object.assign({}, configDefault)

                const configReturned = validator(configurations)
                assert.equal(configReturned.userScopesLocation, configExpected.userScopesLocation, "Did not return expected userScopesLocation")
                assert.equal(configReturned.logicalStrategy, configExpected.logicalStrategy, "Did not return expected logicalStrategy")
                assert.notEqual(configReturned.logicalStrategy, configurations.logicalStrategy, "Did not return expected logicalStrategy")
                assert.equal(configReturned.responseCaseError, configExpected.responseCaseError, "Did not return expected responseCaseError")
                assert.equal(configReturned.flowStrategy, configExpected.flowStrategy, "Did not return expected flowStrategy")
            })

            it('Passing a type invalid logicalStrategy, must return an object with a default logicalStrategy settings.', () => {
                const configurations = {
                    logicalStrategy: {
                        value: "XOR"
                    }
                };
                const configExpected = Object.assign({}, configDefault)

                const configReturned = validator(configurations)
                assert.equal(configReturned.userScopesLocation, configExpected.userScopesLocation, "Did not return expected userScopesLocation")
                assert.equal(configReturned.logicalStrategy, configExpected.logicalStrategy, "Did not return expected logicalStrategy")
                assert.notEqual(configReturned.logicalStrategy, configurations.logicalStrategy, "Did not return expected logicalStrategy")
                assert.equal(configReturned.responseCaseError, configExpected.responseCaseError, "Did not return expected responseCaseError")
                assert.equal(configReturned.flowStrategy, configExpected.flowStrategy, "Did not return expected flowStrategy")
            })

            it('Passing userScopesLocation, must return an object with a merge between valid settings and default settings.', () => {
                const configurations = {
                    responseCaseError: {
                        code: 403,
                        message: "FORBIDDEN",
                        description: "Custom description by develop.",
                        redirect_link: "/authenticate"
                    }
                };
                const configExpected = Object.assign({}, configDefault)
                configExpected.responseCaseError = configurations.responseCaseError;

                const configReturned = validator(configurations)
                assert.equal(configReturned.userScopesLocation, configExpected.userScopesLocation, "Did not return expected userScopesLocation")
                assert.equal(configReturned.logicalStrategy, configExpected.logicalStrategy, "Did not return expected logicalStrategy")
                assert.equal(configReturned.responseCaseError, configExpected.responseCaseError, "Did not return expected responseCaseError")
                assert.equal(configReturned.flowStrategy, configExpected.flowStrategy, "Did not return expected flowStrategy")
            })

            it('Passing valid flowStrategy, must return an object with a merge between valid settings and default settings.', () => {
                const configurations = {
                    flowStrategy: "NEXTWITHERROR"
                };
                const configExpected = Object.assign({}, configDefault)
                configExpected.flowStrategy = configurations.flowStrategy;

                const configReturned = validator(configurations)
                assert.equal(configReturned.userScopesLocation, configExpected.userScopesLocation, "Did not return expected userScopesLocation")
                assert.equal(configReturned.logicalStrategy, configExpected.logicalStrategy, "Did not return expected logicalStrategy")
                assert.equal(configReturned.responseCaseError, configExpected.responseCaseError, "Did not return expected responseCaseError")
                assert.equal(configReturned.flowStrategy, configExpected.flowStrategy, "Did not return expected flowStrategy")
            })

            it('Passing a value invalid in logicalStrategy, must return an object with a default flowStrategy settings.', () => {
                const configurations = {
                    flowStrategy: "OutConfigurations"
                };
                const configExpected = Object.assign({}, configDefault)

                const configReturned = validator(configurations)
                assert.equal(configReturned.userScopesLocation, configExpected.userScopesLocation, "Did not return expected userScopesLocation")
                assert.equal(configReturned.logicalStrategy, configExpected.logicalStrategy, "Did not return expected logicalStrategy")
                assert.equal(configReturned.responseCaseError, configExpected.responseCaseError, "Did not return expected responseCaseError")
                assert.equal(configReturned.flowStrategy, configExpected.flowStrategy, "Did not return expected flowStrategy")
                assert.notEqual(configReturned.flowStrategy, configurations.flowStrategy, "Did not return expected flowStrategy")
            })

            it('Passing a type invalid in logicalStrategy, must return an object with a default flowStrategy settings.', () => {
                const configurations = {
                    flowStrategy: {
                        value: "RETURNRESPONSE"
                    }
                };
                const configExpected = Object.assign({}, configDefault)

                const configReturned = validator(configurations)
                assert.equal(configReturned.userScopesLocation, configExpected.userScopesLocation, "Did not return expected userScopesLocation")
                assert.equal(configReturned.logicalStrategy, configExpected.logicalStrategy, "Did not return expected logicalStrategy")
                assert.equal(configReturned.responseCaseError, configExpected.responseCaseError, "Did not return expected responseCaseError")
                assert.equal(configReturned.flowStrategy, configExpected.flowStrategy, "Did not return expected flowStrategy")
                assert.notEqual(configReturned.flowStrategy, configurations.flowStrategy, "Did not return expected flowStrategy")
            })

        })
    })

})