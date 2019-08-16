'use strict';

import { setElementIdHTML, addBrBeforeNewLineChar, addEmspBeforeTabChar, getErrorObjectDefaultMessage } from "./stringError.mjs"
import { toFormattedJsonStringIfJson, } from '../../utils/scripts/jsonUtils.mjs';

export function printRealErrorObjectToConsoleAndElement(elementId) {
    try {
        let errorMsgObj = getErrorObjectDefaultMessage("realErrorObject.mjs", "printStringErrorToConsoleAndElement( elementId )" );
        throwRealErrorObject( errorMsgObj );
    } catch (error) {
        setElementIdHTML(elementId, getHTMLcodeForErrorObject(error) );
        let reError = new Error( "Caught error - realErrorObject - thrown just to see how it would look:" + "\n\r" + "\n\r" +
            "Error name: " + "\n\r" + error.name + "\n\r" + "\n\r" +
            "Error message: " + "\n\r" + error.message + "\n\r" );
        throw reError;
    }
}

function throwRealErrorObject( errorMsgObj ) {
    let errorObj = {
        description: [
            "This is error object. ",
            "Now we have real location of the error throw."
        ],
        codeFragment:"throw new Error( error.message );",
        errorMessage:errorMsgObj
    };
    let errorStr = toFormattedJsonStringIfJson( errorObj );
    throw new Error( errorStr );
}

export function getHTMLcodeForErrorObject( error ) {
    if( error instanceof Error ) {
        let errorNameString = error.name;
        let errorNamePreparedForHTML = "<h3>error.name</h3>" + "\n\r" + "<p>" + errorNameString + "</p>" + "\n\r";

        let errorMsgString = toFormattedJsonStringIfJson( error.message );
        let errorMsgPreparedForHTML = addBrBeforeNewLineChar( errorMsgString );
        errorMsgPreparedForHTML = addEmspBeforeTabChar( errorMsgPreparedForHTML );
        errorMsgPreparedForHTML = "<h3>error.message</h3>" + "\n\r" + "<p>" + errorMsgPreparedForHTML + "</p>" + "\n\r";

        let errorStackJsonString = toFormattedJsonStringIfJson( error.stack.toString() );
        let errorStackPreparedForHTML = addBrBeforeNewLineChar( errorStackJsonString );
        errorStackPreparedForHTML = addEmspBeforeTabChar( errorStackPreparedForHTML );
        errorStackPreparedForHTML = "<h3>error.stack.toString()</h3>" + "\n\r" + "<p>" + errorStackPreparedForHTML + "</p>" + "\n\r";

        let errorJsonString = toFormattedJsonStringIfJson( error );
        let errorPreparedForHTML = addBrBeforeNewLineChar( errorJsonString );
        errorPreparedForHTML = addEmspBeforeTabChar( errorPreparedForHTML );
        errorPreparedForHTML = "<h3>JSON.stringify(error)</h3>" + "\n\r" + "<p>" + errorPreparedForHTML + "</p>" + "\n\r";

        let errorTableForHTML = "" +
            "<table>\n\r" +
            "       <tr>\n\r" +
            "              <th rowspan='2'>Stack</th>\n\r" +
            "              <th>error.Name</th>\n\r" +
            "       </tr>\n\r" +
            "       <tr>\n\r" +
            "              <th>error.Message</th>\n\r" +
            "       </tr>\n\r" +
            "       <tr>\n\r" +
            "              <td rowspan='2'>" + errorStackPreparedForHTML + "</td>\n\r" +
            "              <td>" + errorNamePreparedForHTML + "</td>\n\r" +
            "       </tr>\n\r" +
            "       <tr>\n\r" +
            "              <td>" + errorMsgPreparedForHTML + "</td>\n\r" +
            "       </tr>\n\r" +
            "</table>\n\r" +
            "\n\r" +
            errorPreparedForHTML;

        return errorTableForHTML;
    }
    else {
        let errorMsg = {
            cause: "parameter 'error' is NOT instanceof Error",
            fileName: "realErrorObject.mjs",
            functionName: "getHTMLcodeForErrorObject( error )"
        };
        throw TypeError( toFormattedJsonStringIfJson(errorMsg) );
    }
}
