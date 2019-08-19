'use strict';

import { setElementIdHTML, getErrorObjectDefaultMessage } from "./stringError.mjs";
import { getHTMLcodeForErrorObject } from "./realErrorObject.mjs";
import { toFormattedJsonStringIfJson } from "../../utils/scripts/jsonUtils.mjs";
import { CustomErrorClass } from "./CustomErrorClass.mjs"
import { formatErrorStack } from "./customPropertiesErrorObject.mjs";

export function printCustomErrorClassObjectToConsoleAndElement(elementId) {
    try {
        let cutDownWindow = {location: window.location};
        let errorMsgObj = getErrorObjectDefaultMessage("customErrorClassObject.mjs", "printCustomPropertiesErrorObjectToConsoleAndElement( elementId )");
        throwCustomErrorClassObject(errorMsgObj);
    } catch (error) {
        setElementIdHTML(elementId, getHTMLcodeForErrorObject(error));
        error.stack = formatErrorStack( "Error: Caught error - customErrorClassObject - thrown just to see how it would look:", error );
        throw error;
    }
}

function throwCustomErrorClassObject( errorMsgObj ) {
    let errorObj = {
        description: [
            "This is custom error class object. ",
            "Now we have: ",
            "1) custom error specific methods",
            "Like before we have: ",
            "1) real location of the error throw. ",
            "2) any needed custom property - example: error code. ",
            "3) but every custom property means we need to add new line of code. "
        ],
        codeFragment:[
            'let error = new CustomErrorClass(     ',
            '     errorStr,     ',
            '     toFormattedJsonStringIfJson(errorObj.codeFragment),     ',
            '     "Custom FromConstructor valueOfExampleProperty",     ',
            '     "Custom FromConstructor valueOfCustomProperty"     ',
            ');',
            'error.setCode("this is error code: " + error.getCode());     '
        ],
        errorMessage:errorMsgObj
    };
    let errorStr = toFormattedJsonStringIfJson( errorObj );
    let error = new CustomErrorClass(
        errorStr,
        "400",
        "Custom FromConstructor valueOfExampleProperty",
        "Custom FromConstructor valueOfCustomProperty"
    );
    error.setCode("this is error code: " + error.getCode());

    throw error;
}
