//var q=[3,6,2,4,9,12,1,7] //even Number
var q=[3,6,2,4,9,12,1,7,5] //odd Number

var left=[6,8,3]
var right=[4,1,5]
var pivotNum=2


//Swaps two entries in an array
function swap(array, indexOne, indexTwo) {
  var tempNum=array[indexTwo]  //temporarily stores second number while swapping
  array[indexTwo]=array[indexOne]
  array[indexOne]=tempNum
  return array
}


//partitions an array into numbers lower than and higher than a pivot entry...Pivot is already at first position
function partition(array) {
  //console.log(array)
  var i=0 //index of right edge of smaller partition
  for (var k=1;k<array.length;k++) {
    //console.log("Hello")
    if (array[k]<array[0]) {   //checks if current array element is smaller than pivot
      array=swap(array,k,i+1)  
      i++  
    } 
  }
  array=swap(array,0,i)  //places pivot in correct position
  return [array, i]  //returns partitioned array and index of pivot
}


//splits the array into left and right array, leaving pivot out of either
function split(array,pivotIndex) {
  var b=[] //left array
  var bIndex=0 //left array index
  var c=[] //right array
  var cIndex=0 //right array index
  for (var i=0;i<array.length;i++) {
    if (i<pivotIndex) {
      b[bIndex]=array[i]
      bIndex++
    } else if (i>pivotIndex) {
      c[cIndex]=array[i]
      cIndex++
    }
  }
  return [b,c]
}


//splices left array, pivot, then right array together and returns resulting array
function splice(leftArray,rightArray,pivot) {
  var completeArray=[]
  var pivotIndex=leftArray.length
  var rightIndex=0
  for (var i=0;i<(leftArray.length+rightArray.length+1);i++) {
    if (i<pivotIndex) {
      completeArray[i]=leftArray[i]
    } else if (i===pivotIndex) {
      completeArray[i]=pivot
    } else if (i>pivotIndex) {
      completeArray[i]=rightArray[rightIndex]
      rightIndex++
    }
  }
  return completeArray
}


//counts comparisons and sorts
function countAndSort(a) {
  if (a.length>1) {
    var d=0 //index of pivot
    var l=0 //number of left array comparisons of child recursive call
    var r=0 //number of right array comparisons of child recursive call
    var p=a[d] //pivot
    console.log("array before placing pivot at first position")
    console.log(a)
    
    a=swap(a,0,d)
    d=0 
    
    console.log("array after placing pivot at first position")
    console.log(a)
    
    var f=partition(a)
    a=f[0]
    d=f[1]
    console.log("array after partition: ")
    console.log(a)
    //console.log(" and ")
    //console.log(d)
    
    var b=[] //left array
    var c=[] //right array
    var t=split(a,d)
    b=t[0]
    c=t[1]
    console.log("left array before sort: ")
    console.log(b)
    console.log("right array before sort: ")
    console.log(c)
    
    var y=countAndSort(b)
    b=y[0]
    l=y[1]
    console.log("left array after sort: ")
    console.log(b)
    console.log("left array compares: ")
    console.log(l)
    
    
    var z=countAndSort(c)
    c=z[0]
    r=z[1]
    
    console.log("right array after sort: ")
    console.log(c)
    console.log("right array compares: ")
    console.log(r)
    
    a=splice(b,c,p)
    return [a,(l+r+(a.length-1))]
  
  } else {
    return [a,0]
  }
}
  
  



//countAndSort(q)
console.log(countAndSort(q)[1])
//console.log(splice(left,right,pivotNum))
//console.log(split(q,1)[1])
//console.log(partition(q)[0])
//console.log(swap(q,2,6))