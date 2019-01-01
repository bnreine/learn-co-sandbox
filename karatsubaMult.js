//var r=3141592653589793238462643383279502884197169399375105820974944592
//var s=2718281828459045235360287471352662497757247093699959574966967627

var r=31415924556490503
var s=3141

function mult(x,y) {
  if (x.toString().length>=2 || y.toString().length>=2) {
    var a=split(x)[0]
    var b=split(x)[1]
    var c=split(y)[0]
    var d=split(y)[1]
    console.log([a,b,c,d])
    
    
    var acMult=mult(a,c)
    var adMult=mult(a,d)
    var bcMult=mult(b,c)
    var bdMult=mult(b,d)
    
    return acMult*10**(split(x)[2]+split(y)[2]) + adMult*10**(split(x)[2])+bcMult*10**(split(y)[2])+bdMult
    
  } else {
    
    return x*y
  }
  
}




//function split Takes in an integer, splits it, returns both integers and the relevant exponent
//eg. 456-------->returns [45, 6, 1]    ////  Because 456 =  45*10^(1)+6
function split(myNum) {
  var myString=myNum.toString()
  
  //case 1----> a single digit number eg. 5
  if (myString.length===1) {
    return [myNum,0,0]
  }
  
  //case 2---> multidigits && an odd number of digits eg. 567
  else if (((myString.length)%2)!==0 && (myString.length>2)) {
    var firstString=""
    var secondString=""
    for (var i=0;i<myString.length;i++) {
      if (i<(myString.length+1)/2) {
        firstString+=myString[i]
      } else {
        secondString+=myString[i]
      }
    }
    return [parseInt(firstString),parseInt(secondString),myString.length-firstString.length]
  }
  
  
  //case 3----> multidigits && an even number of digits eg. 45
  else if (((myString.length)%2)===0 && (myString.length>=2)) {
    //console.log("hi")
    var firstString=""
    var secondString=""
    for (var i=0;i<myString.length;i++) {
      if (i<(myString.length)/2) {
        firstString+=myString[i]
      } else {
        secondString+=myString[i]
      }
    }
    return [parseInt(firstString),parseInt(secondString),myString.length-firstString.length]
  }
  
}



console.log(`The answer is ${mult(r,s)}`)