const assert = require('chai').assert
const sinon = require('sinon')

const authorization = require('../../index')
const configurationsDefault = require('../../lib/config/default')

describe('Simple Authorization:', () => {
    describe('Integrity', () => {
        const keys = Object.keys(authorization)
        it('should return a object with two functions', () => {
            assert.typeOf(authorization, 'object', '"simple.authorization" not return a object')
            assert.equal(keys.length, 2, '"simple.authorization" not returned a object with two property')
            assert.typeOf(authorization[keys[0]], 'function', '"simple.authorization" not returned two function')
            assert.typeOf(authorization[keys[1]], 'function', '"simple.authorization" not returned two function')
        })

        it('must return an object with a function called "config"', () => {
            assert.equal((keys[0] === 'config' || keys[1] === 'config'), true, '"simple.authorization" not returned an object with property called "config"')
            assert.typeOf(authorization.config, 'function', '"simple.authorization" not return a function "config"')
        })

        it('must return an object with a function called "check"', () => {
            assert.equal((keys[0] === 'check' || keys[1] === 'check'), true, '"simple.authorization" not returned an object with property called "check"')
            assert.typeOf(authorization.check, 'function', '"simple.authorization" not return a function "check"')
        })
    })

    describe('Functionality', () => {
        context('Testing the config Function.', () => {
            it('The config function should not be returned', () => {
                const configReturn = authorization.config()
                assert.equal(configReturn, undefined, 'The config function returns some')
            })
        })

        describe('Testing the check Function.', () => {
            it('Check function should return middleware', () => {
                /** This struct define an middleware */
                const expected = "(req,res,next)=>";
                const middlewareReturn = authorization.check()
                /** Removing whitespace */
                const strMiddleware = middlewareReturn.toString().replace(/[ ]/g, '')
                /** Getting the function signature */
                const firstLine = strMiddleware.split('{')[0]
                assert.typeOf(middlewareReturn, 'function', 'Check function not return an middleware')
                assert.equal(firstLine, expected, 'Check function not return an middleware')
            })

            it('When the check function is called without passing expected scopes, middleware should call the next function', () => {
                const req = {}
                const res = {}
                const next = sinon.spy()

                const middleware = authorization.check()
                middleware(req, res, next)
                sinon.assert.called(next)
            })

            it('When the check function is called by passing an empty scope array, middleware should call the next function', () => {
                const req = {}
                const res = {}
                const next = sinon.spy()

                const middleware = authorization.check([])
                middleware(req, res, next)
                sinon.assert.called(next)
            })

            it('When the check function is called by passing an argument of a different type of array, middleware should throw an error', () => {
                const req = {}
                const res = {}
                const next = sinon.spy()

                const middleware = authorization.check({ scopes: ['scope1', 'scope2'] })
                try {
                    middleware(req, res, next)
                    assert.fail('Did not throw error')
                } catch (e) {
                    const msgExpected = 'Expected scopes must be passed in the form of a array, verify the check() function!'
                    assert.equal(e.message, msgExpected, "Did not return expected error")
                }
                sinon.assert.notCalled(next)
            })

            context('When not informed, the default settings should be used.', () => {
                it('should call the function next', () => {
                    const req = {
                        user: {
                            scope: ['scope1', 'scope2']
                        }
                    }
                    const res = {}
                    const next = sinon.spy()

                    const middleware = authorization.check(['scope1', 'scope2'])
                    middleware(req, res, next)

                    sinon.assert.called(next)
                })

                it('should return status code 403', () => {
                    const responseExpected = configurationsDefault.responseCaseError
                    const req = {
                        user: {
                            scope: ['scope4', 'scope3']
                        }
                    }
                    const res = {
                        send: sinon.stub(),
                        status: sinon.stub()
                    }
                    res.status.withArgs(403).returns(res);
                    res.send.withArgs(responseExpected).returns();
                    const next = sinon.spy()

                    const middleware = authorization.check(['scope1', 'scope2'])
                    middleware(req, res, next)

                    sinon.assert.calledWith(res.status, 403)
                    sinon.assert.calledWith(res.send, responseExpected)
                    sinon.assert.notCalled(next)
                })

                it('You should throw an error because req.user.scope doesnt exist', () => {
                    const req = {
                        scopes: ['scope1', 'scope2'],
                        user: {}
                    }
                    const res = {}
                    const next = sinon.spy()

                    const middleware = authorization.check(['scope1', 'scope2'])
                    try {
                        middleware(req, res, next)
                        assert.fail('Did not throw error')
                    } catch (e) {
                        const msgExpected = 'You are using the default userScopeLocation, but req.user.scope is undefined.'
                        assert.equal(e.message, msgExpected, "Did not return expected error")
                    }
                    sinon.assert.notCalled(next)
                })

            })

            context('When informed, local settings should take precedence over default settings', () => {
                it('should call the function next', () => {
                    const req = {
                        user: {
                            scope: ['scope1', 'scope2']
                        }
                    }
                    const res = {}
                    const next = sinon.spy()
                    const options = {
                        logicalStrategy: "AND"
                    }

                    const middleware = authorization.check(['scope1', 'scope2'], options)
                    middleware(req, res, next)

                    sinon.assert.called(next)
                })

                it('must return status code 403 and should not call next function', () => {
                    const options = {
                        logicalStrategy: "AND",
                        responseCaseError: {
                            code: 403
                        }
                    }
                    const req = {
                        user: {
                            scope: ['scope1', 'scope2']
                        }
                    }
                    const res = {
                        send: sinon.stub(),
                        status: sinon.stub()
                    }
                    res.status.withArgs(403).returns(res)
                    res.send.withArgs(options.responseCaseError).returns()
                    const next = sinon.spy()


                    const middleware = authorization.check(['scope1', 'scope3'], options)
                    middleware(req, res, next)

                    sinon.assert.calledWith(res.status, 403)
                    sinon.assert.calledWith(res.send, options.responseCaseError)
                    sinon.assert.notCalled(next)
                })
            })

            context('When informed, you must merge the valid settings entered with the default settings', () => {
                it('must call the next function passing the error object', () => {
                    const options = {
                        userScopesLocation: "userLogged.scope",
                        logicalStrategy: "AND",
                        responseCaseError: {
                            code: 403
                        },
                        flowStrategy: "NEXTWITHERROR"
                    }
                    const req = {
                        userLogged: {
                            scope: ['scope1', 'scope2']
                        }
                    }
                    const res = {
                        send: sinon.spy(),
                        status: sinon.spy()
                    }
                    const next = sinon.stub()


                    const middleware = authorization.check(['scope1', 'scope3'], options)
                    middleware(req, res, next)

                    sinon.assert.notCalled(res.status)
                    sinon.assert.notCalled(res.send)
                    sinon.assert.calledWith(next, options.responseCaseError)
                })

            })
        })


    })

})