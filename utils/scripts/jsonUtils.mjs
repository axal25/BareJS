'use strict';

export function isJsonString( str ) {
    if( !isString(str) ) return false;
    try {
        JSON.parse( str );
        return true;
    }
    catch( e ) {
        return false;
    }
}

export function toJsonIfJsonString( str ) {
    if( isJsonString( str ) ) {
        return JSON.parse( str );
    }
    else {
        return str;
    }
}

export function isJsonObj( obj ) {
    if( isString(obj) ) return false;
    try {
        JSON.stringify( obj );
        return true;
    }
    catch( e ) {
        return false;
    }
}

export function toJsonStringIfJson( obj ) {
    if( isJsonObj( obj ) ) {
        return JSON.stringify( obj );
    }
    else {
        return obj;
    }
}

export function toFormattedJsonStringIfJson( obj ) {
    if( isJsonObj( obj ) ) {
        return JSON.stringify( obj, null, "\t" );
    }
    else {
        return obj;
    }
}

function isString( obj ) {
    if (typeof obj === 'string' || obj instanceof String) return true;
    else return false;
}
