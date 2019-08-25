'use strict';

import { ElementNotFoundError } from "../../utils/scripts/ElementNotFoundError.mjs";
import { getTemplateStringsExample1_1 } from "./example1.mjs";
import {BadPrimaryExampleNumberError} from "./BadPrimaryExampleNumberError.mjs";
import {BadSecondaryExampleNumberError} from "./BadSecondaryExampleNumberError.mjs";
import {getTemplateStringsExample1_2} from "./example1.mjs";

export function templateStringsExamples() {
    addExampleAsChildOf( 1, 1, "divRoot");
    addExampleAsChildOf( 1, 2, "divRoot");
}

export function addExampleAsChildOf( primaryExampleNumber, secondaryExampleNumber, elementId ) {
    if( doesElementExist( elementId ) ) {
        let divExample = createDivForExample( primaryExampleNumber, secondaryExampleNumber );
        document.getElementById(elementId).appendChild( divExample );
    }
    else throw ElementNotFoundError( elementId );
}
// exampleNumber -> secondary
function doesElementExist( elementId ) {
    if( document.getElementById(elementId ) ) return true;
    else return false;
}

function getDivExampleIdTemplate( primaryExampleNumber, secondaryExampleNumber ) {
    return `divExample${primaryExampleNumber}_${secondaryExampleNumber}`;
}

function getH2ExampleIdTemplate( primaryExampleNumber, secondaryExampleNumber ) {
    return `h2Example${primaryExampleNumber}_${secondaryExampleNumber}`;
}

function getH2ExampleInnerTextTemplate( primaryExampleNumber, secondaryExampleNumber ) {
    return `Template String - Example ${primaryExampleNumber}.${secondaryExampleNumber}`;
}

function createDivForExample( primaryExampleNumber, secondaryExampleNumber ) {
    let div = document.createElement("div");
    div.id = getDivExampleIdTemplate( primaryExampleNumber, secondaryExampleNumber );

    let h2 = document.createElement("h2");
    h2.id = getH2ExampleIdTemplate( primaryExampleNumber, secondaryExampleNumber );
    h2.innerText = getH2ExampleInnerTextTemplate( primaryExampleNumber, secondaryExampleNumber );
    div.appendChild( h2 );

    let p = document.createElement( "p" );
    div.appendChild( p );
    p.innerHTML = replaceNewLineWithBr( getTemplateStringExample( primaryExampleNumber, secondaryExampleNumber) );

    return div;
}

function getTemplateStringExample( primaryExampleNumber, secondaryExampleNumber ) {
    switch (primaryExampleNumber) {
        case 1:
            switch (secondaryExampleNumber) {
                case 1:
                    return getTemplateStringsExample1_1();
                case 2:
                    return getTemplateStringsExample1_2();
                default:
                    throw new BadSecondaryExampleNumberError(primaryExampleNumber, secondaryExampleNumber);
            }
            break;
        default:
            throw new BadPrimaryExampleNumberError(primaryExampleNumber);
    }
}

function replaceNewLineWithBr( string ) {
    string = string.replace(/\n/g,"<br/>");
    return string;
}