'use strict';

import { ElementNotFoundError } from "../../utils/scripts/ElementNotFoundError.mjs";

function getPositionAndCompanyName() { return "Internship - Lunarlogic"; }
function getH1Id() { return "positionAndCompanyName"; }
function getSourceParagraphId() { return "sources"; }
function getTextNodeId() { return "applicationFromLink"; }
function getLinkToApplicationFrom() { return "https://internships.lunarlogic.io/"; }
function getAText() { return getPositionAndCompanyName() + "Application Form"; }

export function createButtonSources() {
    createButtonSourcesAsChildOf( getSourceParagraphId() );
}

function createButtonSourcesAsChildOf( elemId ) {
    let sourceParagraph = document.getElementById(elemId);
    if( sourceParagraph ) {
        let button = document.createElement("input");
        button.type = "button";
        button.value = "Reveal source";
        sourceParagraph.appendChild(button);
        button.onclick = function() { revealSources( sourceParagraph ) };
    }
    else throw new ElementNotFoundError("Could NOT find element with id = \"" + elemId + "\".");
}

function revealSources( sourceParagraph ) {
    if( doCreateH1positionAndCompanyName( sourceParagraph ) ) {
        let h1 = document.createElement("h1");
        h1.innerText = getPositionAndCompanyName();
        h1.id = getH1Id();
        sourceParagraph.appendChild( h1 );
    }
    if( doCreateTextNodeApplicationFormLink( sourceParagraph ) ) {
        let textNodePt1 = document.createTextNode("The programming task is taken straight out of...");
        sourceParagraph.appendChild( textNodePt1 );

        let br1 = document.createElement("br");
        sourceParagraph.appendChild(br1);

        let a = document.createElement("a");
        a.href = getLinkToApplicationFrom();
        let aText = document.createTextNode( getAText() );
        a.appendChild( aText );
        sourceParagraph.appendChild( a );

        let br2 = document.createElement("br");
        sourceParagraph.appendChild( br2 );

        let textNodePt2 = document.createTextNode( "Solution is my own." );
        sourceParagraph.appendChild( textNodePt2 );
    }
}

function doCreateH1positionAndCompanyName( sourceParagraph ) {
    return !document.getElementById( getH1Id() ) && sourceParagraph === document.getElementById( getSourceParagraphId() );
}

function doCreateTextNodeApplicationFormLink( sourceParagraph ) {
    return !document.getElementById( getTextNodeId() ) && sourceParagraph === document.getElementById( getSourceParagraphId() );
}


