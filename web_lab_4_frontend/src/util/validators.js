export function isValidX( x ) {
    return (
        isNumeric( x ) && isInteger( x ) && ( x >= -5 ) && ( x <= 3)
    )
}

export function isValidY( y ) {
    return (
        isNumeric( y ) && ( y > -3 ) && ( y < 5)
    )
}

export function isValidR( r ) {
    return (
        isNumeric( r ) && isInteger( r ) && ( r > 0 ) && ( r <= 3)
    )
}

export function isValidFormData( x, y, r ) {
    return (
        isValidX( x ) && isValidY( y ) && isValidR( r )
    )
}

export function isNumeric( n ) {
    return ! isNaN(parseFloat( n )) && isFinite( n );
}

export function isInteger( n ) {

    if ( ! isNumeric(n) ) {
        return false
    } else {
        return ( parseInt(n, 10).toString() === n.toString() )
    }
}

// Returns the closest valid "X" value for the specified one.
export function findClosestX( x ) {

    let closestX = x;

    if (x > 3) {
        closestX = 3
    } else if (x < -5) {
        closestX = -5;
    } else {
        closestX = Math.round(x);
    }

    return closestX;
}

// Returns the closest valid "Y" value for the specified one.
export function findClosestY( y ) {

    let closestY = y;

    if (y >= 5) {
        closestY = 4.999999999999;
    } else if (y <= -3) {
        closestY = -2.999999999999;
    }

    return closestY;
}