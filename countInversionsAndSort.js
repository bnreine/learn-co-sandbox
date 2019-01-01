//var q=[3,19,4,45,2,6,12,1,8,16,13,5,7,9,11,10,23]  //odd number
var q=[34,2,14,23,22,25,1,17,30,31,20,19,5,10]  //even number

//var n=[1,4,5,8,10]
//var m=[2,6,9,11,12]


function countSort(a) {
  if (a.length===1) {
    //return single element array and number of inversions (0), base case
    return [a,0]   
  } else {
    //Split array a into 2 subarrays b and c
    var b=[]
    var c=[]
    var t=split(a)
    b=t[0]
    c=t[1]
    
    //recursive call for left subarray
    var d=[]
    var dInversions=0
    var x=countSort(b)
    d=x[0]
    dInversions=x[1]
    
    //recursive call for right subarray
    var e=[]
    var eInversions=0
    var y=countSort(c)
    e=y[0]
    eInversions=y[1]
    
    //merge subarrays and count all split inversions 
    var f=[]
    var fInversions=0
    var p=mergeSplitInv(d,e)
    f=p[0]
    fInversions=p[1]
    
    return [f,(dInversions+eInversions+fInversions)]
  }

}



function split(a) {
  if (a.length%2===0) { //If the array has an even number of elements, then split it this way
    
   
    var b=[] //initialize left array
    var bIndex=0
    var c=[] //initialize right array
    var cIndex=0
    
    for (var i=0;i<(a.length)/2;i++) {
      b[bIndex]=a[i]
      bIndex++
    }
    
    for (var j=(a.length)/2;j<a.length;j++) {
      c[cIndex]=a[j]
      cIndex++
    }
    
    return [b,c]
    
  } else { //If the array has an odd number of elements, then split it this way
    var d=[] //initialize left array
    var dIndex=0
    var e=[] //initialize right array
    var eIndex=0
    
    for (var k=0;k<(a.length+1)/2;k++) {
      d[dIndex]=a[k]
      dIndex++
    }
    
    for (var l=(a.length+1)/2;l<a.length;l++) {
      e[eIndex]=a[l]
      eIndex++
    }
  
    return [d,e]
  }
}


//function takes in two arrays of integers, sorts them into a new single array and counts the total number of split inversions in the process
function mergeSplitInv(a,b) {
  var c=[] //new whole array
  var i=0 //index counter for array a
  var j=0 //index counter for array b
  var numInv=0 //counts number of inversions
  for (var k=0;k<(a.length+b.length);k++) {
    if ((i<a.length) && (j<b.length)) {
      if (a[i]<b[j]) {
        c[k]=a[i]
        i++
      } else if (a[i]>b[j]) {
        c[k]=b[j]
        numInv+=(a.length-i)
        j++
      }
    } else if (i===a.length) {
      c[k]=b[j]
      j++
    } else if (j===b.length) {
      c[k]=a[i]
      i++
    }
  }
  return [c,numInv]
}




var t=countSort(q)
console.log(t[0])
console.log(" and ")
console.log(t[1])


