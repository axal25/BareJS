'use strict';

import {BadPrimaryExampleNumberError} from "./BadPrimaryExampleNumberError.mjs";

export class BadSecondaryExampleNumberError extends BadPrimaryExampleNumberError {
    constructor( primaryExampleNumber, secondaryExampleNumber ) {
        super( primaryExampleNumber, `Bad secondaryExampleNumber = ${secondaryExampleNumber}.` );
    }
}