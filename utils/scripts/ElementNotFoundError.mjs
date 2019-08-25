'use strict';

export class ElementNotFoundError extends Error {
    constructor( elementId ) {
        super( "Could NOT find element with id = \"" + elementId + "\"." );
    }
}