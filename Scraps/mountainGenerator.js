function drawMountain(){
    var text = document.getElementById("text").value;
    var array = text.split(",");
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height);
    var move = Math.ceil(c.width/array.length);
    var hStrech = c.width/(move*(array.length-1));
    var vStrech = c.height/(Math.max.apply(Math, array)+2);
    ctx.setTransform(hStrech, 0, 0, -vStrech, 0, c.height);
    count = 0;
    ctx.beginPath();
    for(var x=0; x<array.length*move ; x+= move){
        ctx.lineTo(x,array[count]);
        ctx.moveTo(x,array[count]);
        count++;
        ctx.stroke();
    }
    ctx.restore();
}


