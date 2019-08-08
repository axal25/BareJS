'use strict';

function doWhileLoopExample( n ) {
    var i = 0;
    var errorMsg = undefined;
    try {
        if( isNaN(n) ) {
            throw new TypeError("parameter 'n' must be a number");
        }
        else {
            var number = Number(n);
            if( n >= 0 ) {
                do {
                    if( n == 0 ) break;
                    i++;
                }
                while( i < number );
                console.log("i = " + i);
            }
            else {
                throw new RangeError("parameter 'n' must be equal or bigger than 0");
            }
        }
    }
    catch( err ) {
        if(err instanceof TypeError) {
            errorMsg = "Error type: " + err.name + " | " + "Error message: " + err.message + ".";
            console.log(errorMsg);
        } else if(err instanceof RangeError) {
            errorMsg = "Error type: " + err.name + " | " + "Error message: " + err.message + ".";
            console.log(errorMsg);
        } else
        {
            errorMsg = "UNPREDICTED Error type: " + err.name + " | " + "Error message: " + err.message + ".";
            console.log(errorMsg);
        }
    }
    finally {
        console.log("finally");
        if( errorMsg != undefined ) return errorMsg;
        else return i;
    }
}

function forLoopExample() {
    var html = undefined;
    var cars = ['Volvo', 'Mercedes', 'Audi', 'Scoda', 'Polonez', 'BMW', 'Lada'];
    cars[7] = 'Toyota';
    for(var i = 0; i < cars.length; i++) {
        if( html == undefined ) {
            html = "";
        }
        html += cars[i];
        if( i == cars.length-1 ) break;
        else {
            html += "<br>";

        }
    }
    return html;
}

function switchExample( n ) {
    switch ( n ) {
        case 1:
            return 'option #1';
            break;
        case 2:
            return 'option #2';
            break;
        case 3:
            return 'option #3';
            break;
        case 4:
            return 'option #4';
            break;
        case 5:
            return 'option #5';
            break;
        default:
            return 'NOT HANDLED option (default)';
    }
}