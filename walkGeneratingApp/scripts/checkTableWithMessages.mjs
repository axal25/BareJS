'use strict';

import { toJsonIfJsonString } from "../../utils/scripts/jsonUtils.mjs";
import { isStartingPoint, checkDirections, isProperLength } from "./checkTable.mjs";

export function setElementToCheckTableWithMessages(elemId, arrayJsonString ) {
    document.getElementById( elemId ).value = checkArrayValidity(
        toJsonIfJsonString(
            // arrayJsonString.replace(/\n/g,"").replace(/\r/g,"")
            arrayJsonString
        )
    );
}

export function setElementToCheckTable(elemId, arrayJsonString ) {
    document.getElementById( elemId ).value = checkDirections(
        toJsonIfJsonString(
            arrayJsonString
        )
    );
}

function checkArrayValidity( object ) {
    if(object === "Not Generated Yet.") {
        let warningMsg = "Please generate object first. Current object = \"" + object + "\"";
        alert(warningMsg);
        return warningMsg;
    } else {
        if (object instanceof Array) {
            return checkDirectionsWithMessages( object );
        } else throw new Error("Function's checkArrayValidity( object ) 1st argument is not an Array. " + "typeof object = " + (typeof object) + ". object = " + object + ".");
    }
}

function checkDirectionsWithMessages( directionsArray ) {
    let answer = undefined;
    let answerMsg = undefined;
    let x = 0; // current X coordinate ( east -> x += 1, west x -= 1 )
    let y = 0; // current Y coordinate ( north -> y += 1, south y -= 1 )
    if( !isProperLength(directionsArray) ) {
        answer = false;
        answerMsg = `!!! ${answer} !!!\n\rDidn't need to check for coordinates.\n\rdirectionsArray.length = ${directionsArray.length}.`;
        window.alert( answerMsg );
        return answer;
    }
    else {
        for(let elem of directionsArray) {
            switch( elem ) {
                case "n":
                    y += 1;
                    break;
                case "s":
                    y -= 1;
                    break;
                case "e":
                    x += 1;
                    break;
                case "w":
                    x -= 1;
                    break;
                default:
                    throw new Error("Unsupported option in directionsArray. elem = " + elem);
            }
        }

        if( isStartingPoint(x, y) ) {
            answer = true;
            answerMsg = `!!! ${answer} !!!\n\rWe could get back to point of start.`;
        }
        else {
            answer = false;
            answerMsg = `!!! ${answer} !!!\n\rWe could NOT get back to point of start.`;
        }

        answerMsg += " We would end up at ( x = " + x + ", y = " + y + " )";
        window.alert( answerMsg );
        return answer;
    }
}

const foo2 = ( arg ) => {
    return arg;
}

const foo = function (arg) {
    return arg;
};