'use strict';

export function setElementIdInnerTextToTextFromFile( fileName, elementId ) {
    fetch( fileName ).then(
        response => checkResponse( response, fileName )
        // function( response ) {
        //     if( response.status !== 200 ) {
        //         throw new Error('Could not read file "' + fileName + '". Status code: ' + response.status);
        //     }
        //     return response.text();
        // }
    ).then(
        fileContent => setElementIdInnerTextToFileContent( fileContent, elementId )
    ).catch(
        status => logErrorStatus( status )
    );
}

export function setButtonOnClickToScriptFromFile( fileName, elementId ) {
    fetch( fileName ).then(
        response => checkResponse( response, fileName )
    ).then(
        fileContent => setElementIdOnClickToFileScript( fileContent, elementId )
    ).catch(
        status => logErrorStatus( status )
    );
}

function checkResponse( response, fileName ) {
    if( response.status !== 200 ) {
        throw new Error('Could not read file "' + fileName + '". Status: ' + response.status);
    }
    return response.text();
}

function logFileContent( fileContent ) {
    console.log( "fetch( fileName ).then(...).then(...): " + "File content: " + "\n\r" + fileContent );
}

function setElementIdInnerTextToFileContent( fileContent, elementId ) {
    if( elementId ) {
        document.getElementById( elementId ).innerText = fileContent;
    }
}

function setElementIdOnClickToFileScript( fileContent, elementId ) {
    if( elementId ) {
        document.getElementById( elementId ).onclick = function(){
            logFileContent( fileContent );
            try {
                eval(fileContent);
            }
            catch( error ) {
                console.log( error );
            }
        };
    }
}

function logErrorStatus( status ) {
    console.log( "fetch( fileName ).then(...).then(...).catch(...): " + "status: " + "\n\r" + status );
}
