'use strict';

export async function getFileContent( fileName ) {
    let fileContent = await fetchFileContent( fileName );
    return fileContent;
}

function fetchFileContent( fileName ) {
    return fetch( fileName ).then(
        response => checkResponse( response, fileName )
    // ).then(
    //     fileContent => logFileContent( fileContent )
    ).catch(
        responseErrorStatus => logErrorStatus( responseErrorStatus )
    );
}

function checkResponse( response, fileName ) {
    if( response.status !== 200 ) {
        throw new Error('checkResponse( response, fileName ): Could not read file "' + fileName + '". Status: ' + response.status);
    }
    return response.text();
}

function logErrorStatus( responseErrorStatus ) {
    console.log( "logErrorStatus( responseErrorStatus ): " + "responseErrorStatus: " + "\n\r" + responseErrorStatus );
    throw responseErrorStatus;
}

export function logFileContent( fileContent ) {
    console.log( "logFileContent( response ): " + "File content: " + "\n\r" + fileContent );
    return fileContent;
}
