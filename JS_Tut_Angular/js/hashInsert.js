var Table = [null,null,null,null,null,null,null,null,null,null,null,null,null];
var m = Table.length;
var arrayInserts = [18,41,22,44,59,32,31,73];
for(var l=0;l<arrayInserts.length;l++){
    hashInsert(Table,arrayInserts[l]);
}
var tableInfo = "";
for(var l=0;l<Table.length;l++){
    if(Table[l]==null){tableInfo+="null,"}
    else tableInfo+=Table[l]+",";
}
alert(tableInfo);
function hashInsert(T,k){
    var i=0
    while(true){
    if(i==m) break;
    j = h(k,i);
    if(T[j]==null){
        T[j]=k;
        return j;
    } else {
        i+=1;
    }
    }
    alert("Hash Table Overflow");
}
function h1(x){ return (x%13); }
function h(x,i){ return ((h1(x)+i)%13); }