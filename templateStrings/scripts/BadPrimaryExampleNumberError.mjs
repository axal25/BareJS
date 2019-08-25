'use strict';

import { UnhandledSwitchCaseError } from "../../utils/scripts/UnhandledSwitchCaseError.mjs";

export class BadPrimaryExampleNumberError extends UnhandledSwitchCaseError {
    constructor( primaryExampleNumber, optionalMessage ) {
        if( !optionalMessage ) {
            super( `Bad primaryExampleNumber = ${primaryExampleNumber}.` );
        }
        else {
            super(`Bad primaryExampleNumber = ${primaryExampleNumber}.\n${optionalMessage}`);
        }
    }
}