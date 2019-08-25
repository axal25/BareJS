export const checkDirections = directionsArray => {
    console.log(`before if( !isProperLength ) return false;`);
    if( !isProperLength( directionsArray ) ) return false;
    console.log(`before let finishCoordinates = getFinishPoint( directionsArray );`);
    let finishCoordinates = getFinishPoint( directionsArray );
    console.log(`before if( !isStartingPoint( finishCoordinates.x, finishCoordinates.y ) ) return false;`);
    if( !isStartingPoint( finishCoordinates.x, finishCoordinates.y ) ) return false;
    console.log(`after if( !isStartingPoint( finishCoordinates.x, finishCoordinates.y ) ) return false;\nSo TRUE.`);
    return true;
};

function isProperLength( directionsArray ) {
    return directionsArray.length === 10;
}

export const isStartingPoint = ( x, y ) => x === 0 && y === 0;

const getObjectCoordinates = (x, y) => ({x: x,y: y});

const getFinishPoint = ( directionsArray ) => {
    let currentCoordinates = getObjectCoordinates( 0, 0 );
    directionsArray.forEach( direction => {
            let deltaCoordinates = directionsToDeltaCoordinates[ direction ];
            currentCoordinates.x += deltaCoordinates.x;
            currentCoordinates.y += deltaCoordinates.y;
        }
    );
    return currentCoordinates;
};

const directionsToDeltaCoordinates = {
    n: getObjectCoordinates( 0, 1 ),
    s: getObjectCoordinates( 0, -1 ),
    e: getObjectCoordinates( 1, 0 ),
    w: getObjectCoordinates( -1, 0 )
};


/***************************************
 ***            Explanation          ***
 *** no to be included when sending  ***
 ***************************************/

// that's object
// letter (direction) is a property
const directionsToDeltaCoordinatesSimplest = {
    "n": ({x:0, y:1}),
    "s": ({x:0, y:-1}),
    "e": ({x:1, y:0}),
    "w": ({x:-1, y:0})
};

const directionsToDeltaCoordinatesSimpler = {
    n: {x:0, y:1},
    s: {x:0, y:-1},
    e: {x:1, y:0},
    w: {x:-1, y:0}
};