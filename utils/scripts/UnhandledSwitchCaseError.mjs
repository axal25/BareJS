export class UnhandledSwitchCaseError extends Error {
    constructor( message ) {
        super( `Unhandled switch case.\n${message}` );
    }
}