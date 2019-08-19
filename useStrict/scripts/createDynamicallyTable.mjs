"use strict";

import {
    setButtonOnClickToScriptFromFile,
    setElementIdInnerTextToFileContent,
    setElementIdToMessageError
} from "./useStrict.mjs";

export function createAndPopulateTableInDiv(divNumber, startExampleNumber, endExampleNumber, tableOfExplanations ) {
    checkTableOfExplanationsSize( startExampleNumber, endExampleNumber, tableOfExplanations );
    createTableInDiv( divNumber );
    createTrsInTable( divNumber, startExampleNumber, endExampleNumber );
    populateThRow( divNumber, startExampleNumber-1, startExampleNumber);
    populateAllTds( divNumber, startExampleNumber, endExampleNumber, tableOfExplanations );
}

function checkTableOfExplanationsSize( startExampleNumber, endExampleNumber, tableOfExplanations) {
    if( (endExampleNumber - startExampleNumber + 1) !== tableOfExplanations.length ) {
        throw new Error("tableOfExplanations.length === " + tableOfExplanations.length + "\n\r" + " examples number === " + (endExampleNumber - startExampleNumber + 1) );
    }
}

function getDiv( divNumber ) {
    let div = undefined;
    try {
        div = document.getElementById("div" + divNumber);
        if( !div ) {
            if( div === null ) throw new Error("div === null");
            if( div === undefined ) throw new Error("div === undefined");
            throw new Error("!div");
        }
        return div;
    }
    catch( error ) {
        throw new Error("No element with id = \"div" + divNumber + "\"." + "\n\r" + error.message);
    }
}

function createTableInDiv( divNumber ) {
    let div = getDiv( divNumber );
    let table = document.createElement("table");
    div.appendChild( table );
    table.setAttribute("id","table" + divNumber);
    getTable( divNumber );
}

function getTable( tableNumber ) {
    try {
        let table = document.getElementById("table" + tableNumber);
        if( !table ) {
            if( table === null ) throw new Error("table === null");
            if( table === undefined ) throw new Error("table === undefined");
            throw new Error("!table");
        }
        return table;
    }
    catch( error ) {
        throw new Error("No element with id = \"table" + tableNumber + "\"." + "\n\r" + error.message);
    }
}

function createTrsInTable( divNumber, startExampleNumber, endExampleNumber) {
    for(let i = startExampleNumber-1; i <= endExampleNumber; i++) {
        createTrInTable( divNumber, i );
        for(let j = 0; j < 4; j++) {
            createTdOrThInTr( divNumber, i, j, startExampleNumber );
        }
    }
}

function createTrInTable( divNumber, trNumber ) {
    let table = getTable( divNumber );
    let tr = document.createElement("tr");
    table.appendChild(tr);
    tr.setAttribute("id","tr" + divNumber + "." + trNumber);
    getTr( divNumber, trNumber );
}

function getTr( divNumber, trNumber ) {
    try {
        let tr = document.getElementById("tr" + divNumber + "." + trNumber);
        if( !tr ) {
            if( tr === null ) throw new Error("tr === null");
            if( tr === undefined ) throw new Error("tr === undefined");
            throw new Error("!tr");
        }
        return tr;
    }
    catch( error ) {
        throw new Error("No element with id = \"tr" + divNumber + "." + trNumber + "\"." + "\n\r" + error.message);
    }
}

function createTdOrThInTr( divNumber, trNumber, tElemNumber, startExampleNumber ) {
    let tr = getTr( divNumber, trNumber );
    let elemType = undefined;
    if( trNumber === startExampleNumber-1 ) elemType = "th";
    else elemType = "td";
    let tElem = document.createElement( elemType );
    tr.appendChild( tElem );
    tElem.setAttribute("id", elemType + divNumber + "." + trNumber + "." + tElemNumber );
    tElem = getTdOrTh( divNumber, trNumber, tElemNumber, startExampleNumber );
}

function getTdOrTh( divNumber, trNumber, tElemNumber, startExampleNumber ) {
    let elemType = undefined;
    if( trNumber === startExampleNumber-1 ) elemType = "th";
    else elemType = "td";
    try {
        let tElem = document.getElementById( elemType + divNumber + "." + trNumber + "." + tElemNumber );
        if( !tElem ) {
            if( tElem === null ) throw new Error(elemType + " === null");
            if( tElem === undefined ) throw new Error(elemType + " === undefined");
            throw new Error("!" + elemType);
        }
        return tElem;
    }
    catch( error ) {
        throw new Error("No element with id = \"" + elemType + divNumber + "." + trNumber + "." + tElemNumber + "\"." + "\n\r" + error.message);
    }
}

function populateThRow( divNumber, thRowNumber, startExampleNumber) {
    let th1 = getTdOrTh( divNumber, thRowNumber, 0, startExampleNumber );
    let th2 = getTdOrTh( divNumber, thRowNumber, 1, startExampleNumber );
    let th3 = getTdOrTh( divNumber, thRowNumber, 2, startExampleNumber );
    let th4 = getTdOrTh( divNumber, thRowNumber, 3, startExampleNumber );
    th1.innerText = "Code";
    th2.innerText = "Explanation";
    th3.innerText = "Run test code button";
    th4.innerText = "Error message";
}

function populateAllTds( divNumber, startExampleNumber, endExampleNumber, tableOfExplanations ) {
    if( !tableOfExplanations ) throw new Error("!tableOfExplanations");
    let j = 0;
    for(let i=startExampleNumber; i<=endExampleNumber; i++) {
        populateTdRow( divNumber, i, startExampleNumber, tableOfExplanations[j] );
        j++;
    }
}

function populateTdRow( divNumber, tdRowNumber, startExampleNumber, explanation ) {
    let td1 = getTdOrTh( divNumber, tdRowNumber, 0, startExampleNumber );
    let td2 = getTdOrTh( divNumber, tdRowNumber, 1, startExampleNumber );
    let td3 = getTdOrTh( divNumber, tdRowNumber, 2, startExampleNumber );
    let td4 = getTdOrTh( divNumber, tdRowNumber, 3, startExampleNumber );

    let exampleNumber = tdRowNumber;
    let fileName = "./scripts/example" + exampleNumber + ".mjs";
    setElementIdInnerTextToFileContent(fileName, "td" + divNumber + "." + exampleNumber + "." + 0);
    if( !explanation ) throw new Error("!explanation");
    td2.innerText = explanation;
    createButton( divNumber, tdRowNumber, 2 );
    setButtonOnClickToScriptFromFile(fileName, "button" + divNumber + "." + exampleNumber + "." + 2 + "." + 0 );
    setElementIdToMessageError(fileName, "td" + divNumber + "." + exampleNumber + "." + 3);
}

function createButton( divNumber, trNumber, tElementNumber ) {
    let td = getTdOrTh( divNumber, trNumber, tElementNumber )
    let button = document.createElement("input");
    td.appendChild( button );
    button.setAttribute("id","button" + divNumber + "." + trNumber + "." + tElementNumber + "." + 0 );
    button.value = "Try this code!";
    button.type = "button";
    button = getButton( divNumber, trNumber, tElementNumber );
}

function getButton( divNumber, trNumber, tElementNumber ) {
    try {
        let button = document.getElementById("button" + divNumber + "." + trNumber + "." + tElementNumber + "." + 0 );
        if( !button ) {
            if( button === null ) throw new Error("button === null");
            if( button === undefined ) throw new Error("button === undefined");
            throw new Error("!button");
        }
        return button;
    }
    catch( error ) {
        throw new Error("No element with id = \"button" + divNumber + "." + trNumber + "." + tElementNumber + "." + 0 + "\"." + "\n\r" + error.message);
    }
}
