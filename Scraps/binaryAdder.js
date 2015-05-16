/*
http://jsfiddle.net/16m24px7/
*/

var A =   [0,1,0,1,0]; // n-1 size input 1
var B =   [0,1,1,1,0]; // n-1 size input 3
var C = [0,0,0,0,0,0]; // 1 size result

// A + B = C
function AddBinary(A, B, C)
{
    A.reverse(); B.reverse();
    var total = 0, carry = 0;
    for( var i = 0; i < C.length ; i++ )
    {
        total = carry;
        carry = 0;        
        if( i < A.length )
        {
            if( A[i] != B[i] )             // 0+1 or 1+0 --> 1
                total++;
            if( A[i] == 1 && B[i] == 1 )   // 1+1--> 0 carry 1   
                total += 2;
        }
        // Make result 1 if addition => 1
        if( total == 1 ) C[i] = 1
        // Make result 0 carry 1 if addition => 2
        else if ( total == 2 ) carry = 1;
        // Make result 1 carry 1 and put 1 if addition => 3
        else if ( total == 3 ) { carry = 1; C[i] = 1 }
    }
    return C.reverse();
}

AddBinary(A, B, C); // => 0,1,1,0,0,0
