const assert = require('chai').assert
const propertExt = require('../../lib/property.extractor')

describe('Module: property.extractor.js', () => {

    describe('Integrity', () => {
        it('should return a function', () => {
            assert.typeOf(propertExt, 'function', '"property.extractor" is not function type')
        })
    })

    describe('Functionality', () => {
        context('When parameters are valid.', () => {
            it('Object and property path valid, must return corresponding property.', () => {
                const object = {
                    req: {
                        user: {
                            id: "507f1f77bcf86cd799439011",
                            type: "user_type",
                            scopes: ['scope1', 'scope2']
                        },
                        headers: [
                            { "Content-Type": "application/json" },
                            { "Content-Length": "10" }
                        ]
                    },
                    res: {
                        status: 0,
                        body: ""
                    }
                }
                const str = "req.user.scopes";
                const propertyExpected = object.req.user.scopes

                const propertyReturn = propertExt(object, str)
                assert.equal(propertyReturn, propertyExpected, "Did not return expected property")
                assert.equal(typeof propertyReturn, typeof propertyExpected, "Did not return an expected property type")
            })
        })

        context('When any parameters are invalid.', () => {
            it('Object valid and value of property path invalid, must return value undefined.', () => {
                const object = {
                    req: {
                        user: {
                            id: "507f1f77bcf86cd799439011",
                            type: "user_type",
                            scopes: ['scope1', 'scope2']
                        },
                        headers: [
                            { "Content-Type": "application/json" },
                            { "Content-Length": "10" }
                        ]
                    },
                    res: {
                        status: 0,
                        body: ""
                    }
                }
                const str = "req.scopes";
                const propertyExpected = undefined

                const propertyReturn = propertExt(object, str)
                assert.equal(propertyReturn, propertyExpected, "Did not return expected property")
            })

            it('The valid object and property path value contains one. In addition, it must return the last valid value.', () => {
                const object = {
                    req: {
                        user: {
                            id: "507f1f77bcf86cd799439011",
                            type: "user_type",
                            scopes: ['scope1', 'scope2']
                        },
                        headers: [
                            { "Content-Type": "application/json" },
                            { "Content-Length": "10" }
                        ]
                    },
                    res: {
                        status: 0,
                        body: ""
                    }
                }
                const str = "req.user.scopes.";
                const propertyExpected = object.req.user.scopes

                const propertyReturn = propertExt(object, str)
                assert.equal(propertyReturn, propertyExpected, "Did not return expected property")

            })

            it('Object valid and property path type of invalid, must throw a error.', () => {
                const object = {
                    req: {
                        user: {
                            id: "507f1f77bcf86cd799439011",
                            type: "user_type",
                            scopes: ['scope1', 'scope2']
                        },
                        headers: [
                            { "Content-Type": "application/json" },
                            { "Content-Length": "10" }
                        ]
                    },
                    res: {
                        status: 0,
                        body: ""
                    }
                }
                const str = ['req.user.scopes'];

                try {
                    const propertyReturn = propertExt(object, str)
                    assert.fail('Did not throw error')
                } catch (e) {
                    const msgExpected = "The userScopeLocation property must be of type string. Check the settings passed to the simple-express-jwt-authorization middleware."
                    assert.equal(e.message, msgExpected, "Did not return expected error")
                }

            })

            it('Invalid object, regardless of property path value, must return undefined value.', () => {
                const object = undefined
                const str = "req.user.scopes";

                const propertyReturn = propertExt(object, str)
                assert.equal(propertyReturn, undefined, "Did not return expected property")

            })

        })
    })

})