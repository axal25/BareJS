'use strict';

import { toFormattedJsonStringIfJson } from '../../utils/scripts/jsonUtils.mjs';

export function printStringErrorToConsoleAndElement(elementId) {
    try {
        let errorMsgObj = getErrorObjectDefaultMessage("stringError.mjs", "printStringErrorToConsoleAndElement( elementId )");
        throwStringError( errorMsgObj );
    } catch (error) {
        let errorStrPreparedForHTML = addBrBeforeNewLineChar( error );
        errorStrPreparedForHTML = addEmspBeforeTabChar( errorStrPreparedForHTML );
        errorStrPreparedForHTML = '<h3>error</h3>' + 'String error: ' + '"' + '<br>' + '\n\r' +
            errorStrPreparedForHTML + '<br>' + '\n\r' + '"';
        setElementIdHTML(elementId, errorStrPreparedForHTML);

        throw "Error: Caught error - stringError - thrown just to see how it would look:" + "\n\r" +
            "String error: " + error;
    }
}

function throwStringError( errorMsgObj ) {
    let errorObj = {
        description:"This is String. Not an error. No stack trace. We have no idea where it came from.",
        codeFragment:"throw error.message;",
        errorMessage:errorMsgObj
    };
    let errorStr = toFormattedJsonStringIfJson( errorObj );
    throw errorStr;
}

export function addBrBeforeNewLineChar( string ) {
    if( string.includes('\n')) {
        string = string.replace(/\n/g,"<br>\n");
        return string;
    }
    else return string;
}

export function addEmspBeforeTabChar( string ) {
    if( string.includes('\t')) {
        string = string.replace(/\t/g,"\t&emsp;");
        return string;
    }
    else return string;
}

export function setElementIdHTML( elementId, innerHTML ) {
    document.getElementById( elementId ).innerHTML = innerHTML;
}

export function getErrorObjectDefaultMessage( fileName, functionName ) {
    let cutDownWindow = { location: window.location };
    return {
        fileName: fileName,
        functionName: functionName,
        location: location,
        cutDownWindow: cutDownWindow
    };
}