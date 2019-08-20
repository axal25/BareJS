'use strict';

import { getFileContent, logFileContent } from "../../utils/scripts/fileUtils.mjs";

export function setElementIdInnerHTMLToFileCode( fileName, elementId ) {
    getFileContent( fileName ).then(
        function( fileContent ) {
            document.getElementById( elementId ).innerHTML = "<pre><code>" + fileContent.trim() + "</code></pre>";
        }
    );
}

export function setButtonOnClickToScriptFromFile( fileName, elementId ) {
    getFileContent( fileName ).then(
        fileContent => setElementIdOnClickToFileScript( fileContent, elementId, fileName )
    );
}

export function setElementIdToMessageError( fileName, elementId ) {
    getFileContent( fileName ).then(
        fileContent => setElementIdToMessageErrorFromFileContent( fileContent, elementId, fileName )
    );
}

function setElementIdToMessageErrorFromFileContent( fileContent, elementId , fileName ) {
    if( elementId ) {
        try {
            evalGlobally( fileContent );
            document.getElementById( elementId ).innerText = getNoErrorMessage( fileName );
        }
        catch( error ) {
            document.getElementById( elementId ).innerText = error.message + "\n\r" + "at file \"" + fileName + "\"";
        }
    }
    else {
        throw new Error("No elementId \"" + elementId + "\"");
    }
}

function setElementIdOnClickToFileScript( fileContent, elementId, fileName ) {
    if( elementId ) {
        document.getElementById( elementId ).onclick = function() { evalFileContent( fileContent, fileName ) };
    }
    else {
        throw new Error("No elementId \"" + elementId + "\"");
    }
}

function evalFileContent( fileContent, fileName ) {
    try {
        logFileContent( fileContent );
        evalGlobally( fileContent );
        alert( getNoErrorMessage( fileName ) );
    }
    catch( error ) {
        alert( error.stack.toString() );
        throw error;
    }
}

function getNoErrorMessage( fileName ) {
    return "No error at file \"" + fileName + "\"" + "\n\r" +
        "This should not happen.";
}

function evalGlobally( string ) {
    deleteGlobally();

    // indirect eval call
    // to evaluate in global scope
    // example:
    /**
     * x = 3.14;
     * myFunction();
     *
     * function myFunction() {
     *        "use strict";
     *        y = 3.14;
     * }
     *
     */
    // would not work properly with
    // eval( string );
    // different ways to evaluate in global scope
    /**
     * window.eval( string );
     * (1, eval)( string );
     *
     * let differentNameForEvalFunc = eval;
     * differentNameForEvalFunc( string );
     *
     * let obj = { eval: eval };
     * obj.eval( string );
     */
    eval.call(null, string);
}

function deleteGlobally() {
    // can't delete variable defined with 'var' example: 'var z;'
    // can't delete predefined properties like Math.PI
    let deleteExp = "delete( window.x );" + "\n\r";
    deleteExp += "delete( window.y );" + "\n\r";
    eval.call( null, deleteExp);
}
