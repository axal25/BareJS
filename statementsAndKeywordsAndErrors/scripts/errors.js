'use strict';

function setEvalErrorHandlingResult( param, paramElementId, resultElementId ) {
    setElementIdText( paramElementId, param );
    var returnMsgObj = errorHandlingExampleEval( param );
    var innerHTML = "errorHandlingExampleEval( " + param + " ) = <br>" +
        "&emsp;" + "functionName: " + returnMsgObj.functionName + "<br>" +
        "&emsp;" + "functionParameter: " + returnMsgObj.functionParameter + "<br>" +
        "&emsp;" + "isSuccessful: " + returnMsgObj.isSuccessful + "<br>" +
        "&emsp;" + "processedParameter: " + toJsonStringIfJson( returnMsgObj.processedParameter ) + "<br>" +
        "&emsp;" + "errorMessageObject: " + toJsonStringIfJson( returnMsgObj.errorMessageObject );
    setElementIdHTML( resultElementId, innerHTML );
}

function setElementIdHTML( elementId, innerHTML ) {
    document.getElementById( elementId ).innerHTML = innerHTML;
}

function setElementIdText( elementId, innerText ) {
    document.getElementById( elementId ).innerText = innerText;
}

function handleError( error ) {
    var jsonError = undefined;
    if( error instanceof EvalError ) {
        jsonError = getJsonErrorAndLog( error, false );
    } else if( error instanceof RangeError ){
        jsonError = getJsonErrorAndLog( error, false );
    } else if( error instanceof ReferenceError ){
        jsonError = getJsonErrorAndLog( error, false );
    } else if( error instanceof SyntaxError ){
        jsonError = getJsonErrorAndLog( error, false );
    } else if( error instanceof TypeError ){
        jsonError = getJsonErrorAndLog( error, false );
    } else if( error instanceof URIError ){
        jsonError = getJsonErrorAndLog( error, false );
    } else {
        jsonError = getJsonErrorAndLog( error, true );
    }
    return jsonError;
}

function getJsonErrorAndLog( error, isUnpredicted ) {
    if( error instanceof Error ) {
        var jsonErrorIsUnpredicted = appendErrorByUnpredicted( error, isUnpredicted );
        return jsonErrorIsUnpredicted;
    }
    else {
        throw new TypeError("argument 'error' isn't of type Error it's of type " + error.name);
    }
}

function appendErrorByUnpredicted( error, isUnpredicted ) {
    return {"errorName":error.name,"errorMessage":error.message,"isUnpredicted":isUnpredicted};
}

function ReturnMsgObj( functionName, param, isSuccessful, processedParam, errorMsgObj ) {
    return {
        "functionName":functionName,
        "functionParameter":param,
        "isSuccessful":true,
        "processedParameter":processedParam,
        "errorMessageObject":errorMsgObj
    };
}
