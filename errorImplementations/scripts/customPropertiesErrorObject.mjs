'use strict';

import { toFormattedJsonStringIfJson } from '../../utils/scripts/jsonUtils.mjs'
import { setElementIdHTML, getErrorObjectDefaultMessage } from "./stringError.mjs"
import { getHTMLcodeForErrorObject } from "./realErrorObject.mjs";

export function printCustomPropertiesErrorObjectToConsoleAndElement(elementId) {
    try {
        let errorMsgObj = getErrorObjectDefaultMessage("customPropertiesErrorObject.mjs", "customPropertiesErrorObject.mjs" );
        throwCustomPropertiesErrorObject( errorMsgObj );
    } catch (error) {
        setElementIdHTML(elementId, getHTMLcodeForErrorObject(error) );
        error.stack = formatErrorStack( "Error: Caught error - customPropertiesErrorObject - thrown just to see how it would look:", error );
        throw error;
    }
}

function throwCustomPropertiesErrorObject( errorMsgObj ) {
    let errorObj = {
        description: [
            "This is error object with custom properties. ",
            "Now we have: ",
            "2) any needed custom property - example: error code. ",
            "3) but every custom property means we need to add new line of code. ",
            "4) and our errors can't have custom methods. ",
            "Like before we have: ",
            "1) real location of the error throw. "
        ],
        codeFragment:[
            "let error = new Error( errorStr ); ",
            "error.code = \"ExampleErrorCode\"; ",
            "error.exampleProperty = \"valueOfExampleProperty\" ",
            "throw error; "
        ],
        errorMessage:errorMsgObj
    };
    let errorStr = toFormattedJsonStringIfJson( errorObj );
    let error = new Error( errorStr );
    error.code = "ExampleErrorCode";
    error.exampleProperty = "valueOfExampleProperty";
    throw error;
}

export function formatErrorStack( prestackMessage, error ) {
    error.stack = prestackMessage + "\n\r" + "\n\r" +
        "error.name: " + "\n\r" + error.name + "\n\r" + "\n\r" +
        "error.message: " + "\n\r" + error.message + "\n\r" + "\n\r" +
        "error.stack: " + "\n\r" + error.stack + "\n\r";
    return error.stack;
}
