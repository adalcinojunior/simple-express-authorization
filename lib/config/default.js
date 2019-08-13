/**
 * File with default settings
 */
module.exports = {
    /**
    * By default we use -> req.user.scope
    * Observation: 
    *      - userScopesLocation is a string
    *      - req.user.scope is expected to be of type Array.
    * 
    * When informed "a.b.c" we use -> req['a']['b']['c']
    */
    userScopesLocation: "DEFAULT",

    /**
    * By default we use -> OR
    * Observation: 
    *      - logicalStrategy is a string
    *      - We currently only support "OR" and "AND".
    */
    logicalStrategy: "OR",

    /**
     * responseCaseError is the content returned in the response body when flowStrategy is not modified,
     * or when it is set to the default value "RETURNRESPONSE"
     */
    responseCaseError: {
        code: 403,
        message: "FORBIDDEN",
        description: "Authorization failed due to insufficient permissions.",
        redirect_link: "/auth"
    },

    /**
     * By default we use -> RETURNRESPONSE
     * Observation: 
     *      - flowStrategy is a string
     *      - "RETURNRESPONSE"-> When the user does not have the required scopes, the object responseCaseError is returned.
     *      - "NEXTWITHERROR"-> When the user does not have the required scopes, the next() function is called passing the responseCaseError object.
     *      -  We currently only support "RETURNRESPONSE" and "NEXTWITHERROR".
     */
    flowStrategy: "RETURNRESPONSE"
}
