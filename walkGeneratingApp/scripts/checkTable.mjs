'use strict';

import { toJsonIfJsonString, toFormattedJsonStringIfJson } from "../../utils/scripts/jsonUtils.mjs";

export function setElementToCheckTable( elemId, arrayJsonString ) {
    document.getElementById( elemId ).value = checkTable(
        toJsonIfJsonString(
            // arrayJsonString.replace(/\n/g,"").replace(/\r/g,"")
            arrayJsonString
        )
    );
}

function checkTable( array ) {
    if(array === "Not Generated Yet.") {
        let warningMsg = "Please generate array first. Current array = \"" + array + "\"";
        alert(warningMsg);
        return warningMsg;
    } else {
        if (array instanceof Array) {
            return checkTableForConditions( array );
        } else throw new Error("Function's checkTable( array ) 1st argument is not an Array. " + "typeof array = " + (typeof array) + ". array = " + array + ".");
    }
}

function checkTableForConditions( array ) {
    let answer = undefined;
    let answerMsg = undefined;
    let x = 0; // current X coordinate ( east -> x += 1, west x -= 1 )
    let y = 0; // current Y coordinate ( north -> y += 1, south y -= 1 )
    if( array.length !== 10 ) {
        answer = false;
        answerMsg = "!!! " + answer + " !!!\n\r" + "Didn't need to check for coordinates. array.length = " + array.length + ".";
        window.alert( answerMsg );
        return answer;
    }
    else {
        for(let elem of array) {
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
                    throw new Error("Unsupported option in array. elem = " + elem);
            }
        }

        if( x === 0 && y === 0 ) {
            answer = true;
            answerMsg = "!!! " + answer + " !!!\n\r" + "We could get back to point of start.";
        }
        else {
            answer = false;
            answerMsg = "!!! " + answer + " !!!\n\r" + "We could NOT get back to point of start.";
        }

        answerMsg += " We would end up at ( x = " + x + ", y = " + y + " )";
        window.alert( answerMsg );
        return answer;
    }
}
