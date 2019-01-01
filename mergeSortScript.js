var nums=[7,5,8,11,11,4,7,1]


function mySort(myArray) {
  if (myArray.length>=2) {
    var a=[]
    for (var i=0;i<(myArray.length)/2;i++) {
      a[i]=myArray[i]
    }
    
    var b=[]
    for (var j=0;j<(myArray.length)/2;j++) {
      b[j]=myArray[j+(myArray.length)/2]
    }
  
    var c=mySort(a)
    var d=mySort(b)

    var e=[]
    var k=0
    var l=0
    for(var m=0;m<(c.length+d.length);m++) {
      if (!(c[k])) {
        e[m]=d[l]
        l++
      } else if (!(d[l])) {
        e[m]=c[k]
        k++
      } else if (c[k]<=d[l]) {
        e[m]=c[k];
        k++;
      } else if (c[k]>d[l]) {
        e[m]=d[l];
        l++;
      }
    }
      return e
}
  else {
    return myArray
  }
}

var sortedArray=mySort(nums)
console.log(sortedArray)