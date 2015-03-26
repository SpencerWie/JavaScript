/*
Working JS Fiddle link:
    http://jsfiddle.net/71e8xL60/6/
*/

document.getElementById("calc").onclick = function() 
{
    // Get the X and Y values and take away spaces
    var X = document.getElementById("X").value.replace(/ /g,'');
    var Y = document.getElementById("Y").value.replace(/ /g,'');
    
    // Make into array, Remove any empty strings (from adding commas at the end)
    X = X.split(",").filter(Boolean);
    Y = Y.split(",").filter(Boolean);
    
    // Make sure we have the same amount of items in X as in Y
    if(X.length != Y.length) {
        alert("To compute R we need the same amount of numbers in both the X and Y values. There are "+X.length+" X values and "+Y.length+" Y values");
        return false;
    }
    // N is the amount of X or Y items
    var N = X.length;
    
    // Calculate all the sumations with a loop
    var sumX = 0, sumY = 0, sumX2 = 0, sumY2 = 0, sumXY = 0;
    
    for(var i = 0; i < N; i++) {
        var currentX = parseInt(X[i]);
        var currentY = parseInt(Y[i]);
        
        if( isNaN(currentX) || isNaN(currentY) ) {
            alert("There is a value that isn't a number in your input. It seems that for value number "+i+" for X is \""+X[i]+"\" and for Y it's \""+Y[i]+"\", one of those is not a number");
            return false;
        }    
        sumX += currentX;
        sumY += currentY;
        sumX2 += currentX*currentX;
        sumY2 += currentY*currentY;
        sumXY += currentX*currentY;
    }    
    
    // Apply foruma
    var top = N*sumXY-sumX*sumY;
    var bottom = Math.sqrt(
        (N*sumX2-Math.pow(sumX,2))*(N*sumY2-Math.pow(sumY,2))
    )
    var r = top/bottom;
    
    // If we don't get a number (sqrt a negative) it means the data wasn't valid
    if(isNaN(r)) {
        document.getElementById("result").innerHTML = "Data given is not valid to compute R";
    } else {
        document.getElementById("result").innerHTML = 
        "<strong>r = "+r+"</strong><br />"
        +"&Sigma;x = "+sumX+"<br />"
        +"&Sigma;y = "+sumY+"<br />"
        +"&Sigma;x<sup>2</sup> = "+sumX2+"<br />"
        +"&Sigma;y<sup>2</sup> = "+sumY2+"<br />"
        +"&Sigma;xy = "+sumXY+"<br />";
    }
}
