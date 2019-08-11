/**
 * File with default settings
 */
module.exports = {
    userScopesLocation: "DEFAULT",
    /**
     * By default we use -> req.user.scope
     * Observation: req.user.scope is expected to be of type Array.
     * 
     * When informed "a.b.c" we use -> req['a']['b']['c']
     */

    logicalStrategy: "OR",// AND, OR, NOT, XOR, NOR
    responseCaseError: {
        code: 403,
        message: "FORBIDDEN",
        description: "Authorization failed due to insufficient permissions.",
        redirect_link: "/auth"
    },
    flowStrategy: "RETURNRESPONSE"
    /**
     * "RETURNRESPONSE"-> When the user does not have the required scopes, the object responseCaseError is returned.
     * "NEXTWITHERROR"-> When the user does not have the required scopes, the next() function is called passing the responseCaseError object.
     */
}
