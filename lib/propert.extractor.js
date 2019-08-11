'use strict'

/**
 * Function to extract the value of a property of an object from a string with its properties.
 * @param {*} object 
 * @param {*} str 
 */
module.exports = (object, str) => {
    if (typeof str !== 'string') {
        const msgError = `The userScopeLocation property must be of type string. Check the settings passed to the simple-express-jwt-authorization middleware.`;
        throw Error(msgError);
    }
    const propeties = str.split('.')
    let property = object;
    propeties.forEach((key) => {
        if (property === undefined || property === null) {
            console.warn(new Date().toISOString() + ' warn [simple-express-jwt-authorization] The property set on userScopeLocation returned undefined!');
            return undefined;
        }
        if (!key) return property;
        property = property[key];
    });
    if (property === undefined || property === null) console.warn(new Date().toISOString() + ' warn [simple-express-jwt-authorization] The property set on userScopeLocation returned undefined!');
    return property;
}
