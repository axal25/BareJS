'use strict';

function isJsonString( obj ) {
    try {
        JSON.parse( obj );
        return true;
    }
    catch( e ) {
        return false;
    }
}

function toJsonIfJsonString( obj ) {
    if( isJsonString( obj ) ) {
        return JSON.parse( obj );
    }
    else {
        return obj;
    }
}

function isJsonObj( obj ) {
    try {
        JSON.stringify( obj );
        return true;
    }
    catch( e ) {
        return false;
    }
}

function toJsonStringIfJson( obj ) {
    if( isJsonObj( obj ) ) {
        return JSON.stringify( obj );
    }
    else {
        return obj;
    }
}
