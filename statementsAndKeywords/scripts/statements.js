"use strict";

let x, y, z;
x = 5;
y = 15;
z = x + y;

function getX() { return x; }
function getY() { return y; }
function getZ() { return z; }

function setPGetXYZ() {
    document.getElementById('getX').innerHTML = 'getX() = ' + getX();
    document.getElementById('getY').innerText = 'getY() = ' + getY();
    document.getElementById('getZ').innerText = 'getZ() = ' + getZ();
}

function getSum( param1, param2 ) {
    return param1 + param2;
}

function parseFloatAndGetSum( param1, param2 ) {
    let parsedParam1 = parseFloat( param1 );
    let parsedParam2 = parseFloat( param2 );
    return getSum( parsedParam1, parsedParam2 );
}

function getValueParseFloatAndGetSum( param1, param2 ) {
    let valueParam1 = param1.value;
    let valueParam2 = param2.value;
    return parseFloatAndGetSum( valueParam1, valueParam2 );
}
