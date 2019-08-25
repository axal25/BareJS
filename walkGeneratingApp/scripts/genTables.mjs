'use strict';

import { toJsonStringIfJson } from '../../utils/scripts/jsonUtils.mjs';
import { ElementNotFoundError } from '../../utils/scripts/ElementNotFoundError.mjs';

export function setElementOnClickToFunction( elemId, aFunction ) {
    if( isFunction( aFunction ) ) {
        let element = document.getElementById( elemId );
        if( element ) element.onclick = aFunction;
        else throw new ElementNotFoundError( elemId );
    }
    else throw new Error( "Parameter #2 of function setElementOnClickToFunction( elemId, aFunction ) is not a function. " + aFunction + " is not a function.");
}

export function setElementTo10SizeRandomTable( elemId, size ) {
    document.getElementById( elemId ).value = toJsonStringIfJson( getSetSizeRandomTable( size ) );
}

export function setElementToRandomSizeTable( elemId ) {
    // document.getElementById( elemId ).value = wrapTextEvery(
    //     toJsonStringIfJson(
    //         getRandomSizeRandomTable()
    //     ),
    //     80
    // );
    document.getElementById( elemId ).value = toJsonStringIfJson(
        getRandomSizeRandomTable()
    );
}

function getRandomSizeRandomTable() {
    let size = Math.floor( Math.random() * 100 + 1 );
    return getSetSizeRandomTable( size );
}

function getSetSizeRandomTable( size ) {
    let arrayToReturn = new Array( size );
    for(let i=0; i<arrayToReturn.length; i++) {
        arrayToReturn[i] = Math.floor( Math.random() * 4 + 1 );
    }
    arrayToReturn = changeTableEntriesToLetters( arrayToReturn );
    return arrayToReturn;
}

function changeTableEntriesToLetters( array ) {
    for(let i=0; i<array.length; i++) {
        switch( array[i] ) {
            case 1:
                array[i] = "n";
                break;
            case 2:
                array[i] = "s";
                break;
            case 3:
                array[i] = "e";
                break;
            case 4:
                array[i] = "w";
                break;
            default:
                throw new Error("Unsupported option in array. array[" + i + "] = " + array[i]);
        }
    }
    return array;
}

function isFunction(object) {
    return object instanceof Function;
}

function wrapTextEvery( string, limit ) {
    limit = parseInt( limit );
    let arrayOfStrings = string.split("");
    let stringToReturn = "";
    for(let i=0; i<arrayOfStrings.length; i++) {
        if( i !== 0 && i%limit === 0 ) {
            stringToReturn += "\n\r";
        }
        else {
        }
        stringToReturn += arrayOfStrings[i];
    }
    return stringToReturn;
}