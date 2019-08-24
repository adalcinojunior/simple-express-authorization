declare var simpleAuthorization: simpleAuthorization.SimpleAuthorization
export = simpleAuthorization

declare namespace simpleAuthorization {

    export interface SimpleAuthorization {
        (options?: IOptions): any

        config(options?: IOptions): any

        check(expectedScopes: Array<string>, options?: IOptions): any

    }

    export interface IOptions {
        userScopesLocation?: string
        logicalStrategy?: string
        responseCaseError?: object
        flowStrategy?: string
    }
}