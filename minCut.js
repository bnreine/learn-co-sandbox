//var myArray=[[[1],[4,2]],[[2],[3,4,3,1]],[[3],[4,2,2]],[[4],[2,3,1]]]   //original adj list!!!

//var myArray=[[[1],[4,2]],[[2],[3,3,3,1]],[[3],[4,5,5]],[[4],[2,3,1]]]

//var myArray=[[[],[]],[[2],[3,4,3,1]],[[3],[4,2,2]],[[4],[2,3,1]]]


//Counts number of vertices in the graph
function countVertices(array) {
  var numVertices=0
  for (var i=0;i<array.length;i++) {
    if (array[i][0].length!==0) {
      numVertices++
    }
  }
  return numVertices
}


//Counts number of edges in the graph
function countEdges(array) {
  var countAdjacencyEntries=0
  for (var j=0;j<array.length;j++) {
    countAdjacencyEntries+=array[j][1].length
  }
  return countAdjacencyEntries/2
}

//finds the vertex row index and associated adjacency entry index...[vertexRowIndex,adjacencyIndex]
function findRandElement(randNum, array) {
  var countAdjacencyElements=0
  for (var k=0;k<array.length;k++) {
    countAdjacencyElements+=array[k][1].length
    if (countAdjacencyElements>=randNum) {
      return [k,(array[k][1].length-1-(countAdjacencyElements-randNum))]
    }
  }
}




//deletes all numTwo in rowOne and all numOne in rowTwo
//returns updated array, numOne, numTwo, and row for numTwo index
function deleteInBothRows(array,rowOne,adjacencyIndex) {
  //first, save numOne and numTwo, then delete all numTwo in rowOne
  
  /*
  console.log(array[0])
  console.log(array[1])
  console.log(array[2])
  console.log(array[3])
  */ 
 
 
  var numOne=array[rowOne][0][0]
  //console.log(`numone is: ${numOne}`)
  var numTwo=array[rowOne][1][adjacencyIndex]
  //console.log(`numtwo is: ${numTwo}`)
  
  //delete all numTwo in rowOne
  var m=0  //counts through adjacency array while iteratively shrinking
  var numDeleted=0
  var size=array[rowOne][1].length
  while(m<size-numDeleted){
    if (array[rowOne][1][m]===numTwo) {
      array=deleteElement(array,rowOne,m)
      numDeleted++
      m--
    }
    m++
  }  
   

  //next remove all numOne in rowTwo
  var n=0  //counts through adjacency array while iteratively shrinking
  numDeleted=0
  rowTwo=findRowTwo(array,numTwo)
  //console.log(`index of numtwo is: ${rowTwo}`)
  size=array[rowTwo][1].length
  while(n<size-numDeleted){
    if (array[rowTwo][1][n]===numOne) {
      array=deleteElement(array,rowTwo,n)
      numDeleted++
      n--
    }
    n++
  }
return [array,numOne,numTwo,rowTwo] 

}





//Finds the outer index location of num 2
function findRowTwo(array,num) {
  for (var p=0;p<array.length;p++) {
    if (array[p][0][0]===num) {
      return (array[p][0][0]-1)
    }
  }
}




//removes element from adjacency array of particular row and splices rest of array together returning original adjacency list
function deleteElement(array,rowIndex,adjacencyIndex) {
  //var originalLength=array[rowIndex][1].length
  var newArray=[]  //new array
  var sizeRowIndexAdjList=array[rowIndex][1].length
  for (var q=0;q<sizeRowIndexAdjList;q++) {
    if (q<adjacencyIndex) {
      newArray[q]=array[rowIndex][1][q]
    } else if(q>adjacencyIndex) {
      newArray[q-1]=array[rowIndex][1][q]
    }
  }
  array[rowIndex][1]=newArray
return array  
}


//appends rowOne node list to that of rowTwo.  Appends rowOne adj list to that of rowTwo.  Deletes node list and adj list in rowOne
function moveVertexAndAdjacency(array,rowOne,rowTwo) {
  //append collection at numOne node onto numTwo node
  var sizeRowOneNodeList=array[rowOne][0].length
  var sizeRowTwoNodeList=array[rowTwo][0].length
  for (var r=0;r<sizeRowOneNodeList;r++) {
     array[rowTwo][0][sizeRowTwoNodeList+r]=array[rowOne][0][r]
  }
  
  //delete all row one node labels
  array[rowOne][0]=[]  
  
  
  
  //append row one adjacency list to that of row two 
  var sizeRowOneAdjList=array[rowOne][1].length
  var sizeRowTwoAdjList=array[rowTwo][1].length
  for (var s=0;s<sizeRowOneAdjList;s++) {
    //console.log(`index s: ${s}`)
    //console.log(`number appended: ${array[rowOne][1][s]}`)
    array[rowTwo][1][sizeRowTwoAdjList+s]=array[rowOne][1][s]
  }
  
  //delete all row one adjacency countAdjacencyEntries
  array[rowOne][1]=[]
  
  return array
}



//converts all numOne's in entire adjacency list to numTwo
function convertAll(array,numOne,numTwo) {
  for (var t=0;t<array.length;t++){
    for (var u=0;u<array[t][1].length;u++){
      if (array[t][1][u]===numOne) {
        array[t][1][u]=numTwo
      }
    }
  }
  return array
}


//executes karger min cut algorithm...randomly selects edge, condenses the two vertices into one, deletes self loops and then repeats until there's only 2 vertices left in the graph
function karger(array) {
  var randNum=0
  var numVertices=countVertices(array)
  var rowOne=-3
  var rowTwo=-3
  var adjIndex=-150
  var numOne=-200
  var numTwo=-200
  for (var v=numVertices;v>2;v--){
    //create random number between 1 and countEdges(array)*2
    randNum=getRandInt(array)
    //console.log(`random number is: ${randNum}`)
    var temp1=findRandElement(randNum,array)
    rowOne=temp1[0]
    adjIndex=temp1[1]
    
   /*
    console.log(`row one index is: ${rowOne}`)
    console.log(`rowOne's adjacency index is: ${adjIndex}`)
    */
    
    
    var temp2=deleteInBothRows(array,rowOne,adjIndex)
    array=temp2[0]
    numOne=temp2[1]
    numTwo=temp2[2]
    rowTwo=temp2[3]
    
    
    /*
    console.log("new array after deletion: ")
    console.log(array[0])
    console.log(array[1])
    console.log(array[2])
    console.log(array[3])
    console.log(`numOne: ${numOne}`)
    console.log(`numTwo: ${numTwo}`)
    console.log(`rowTwo: ${rowTwo}`)
    */
    
    
    array=moveVertexAndAdjacency(array,rowOne,rowTwo)
    
    /*
    console.log("new array after moving vertices and adjacencies: ")
    console.log(array[0])
    console.log(array[1])
    console.log(array[2])
    console.log(array[3])
    */
    
    
    
    array=convertAll(array,numOne,numTwo)
    
    /*
    console.log("new array after converting all numOne's to numTwo's: ")
    console.log(array[0])
    console.log(array[1])
    console.log(array[2])
    console.log(array[3])
    */
    
    
    
    
  }
  
  return countEdges(array)
}



function getRandInt(array) {
  return Math.floor(Math.random() * Math.floor(countEdges(array)*2))+1
}


//runs karger algorithm n^2*ln(n) times and returns the smallest cardinality found in all runs
function findMinCut() {
  var array=[[[1],[4,2]],[[2],[3,4,3,1]],[[3],[4,2,2]],[[4],[2,3,1]]]   //original adj list!!!
  var minNumEdges=-200
  var numEdges=-300
  var numVertices=countVertices(array)
  for (var x=0;x<((numVertices**2)*Math.log(numVertices));x++) {
    
     var myArray=[[[1],[4,2]],[[2],[3,4,3,1]],[[3],[4,2,2]],[[4],[2,3,1]]]   //original adj list!!!
    
    console.log(`min num edges: ${minNumEdges}`)
    
    /*
    console.log("Before:")
    console.log(OrigArray[0])
    console.log(OrigArray[1])
    console.log(OrigArray[2])
    console.log(OrigArray[3])
    */
    
    
    numEdges=karger(myArray)
    
    console.log(`num edges: ${numEdges}`)
     
   /*  
    //console.log(numEdges)
    console.log("After:")
    console.log(OrigArray[0])
    console.log(OrigArray[1])
    console.log(OrigArray[2])
    console.log(OrigArray[3])
    */
    
    
    
    if (x===0){
      minNumEdges=numEdges
    } else if (numEdges<minNumEdges){
      minNumEdges=numEdges
    }
  }
  return minNumEdges
}




console.log(findMinCut())
//console.log(getRandInt(myArray))

//console.log(karger(myArray))


//console.log(convertAll(myArray,2,3)[3][1])




//console.log(moveVertexAndAdjacency(myArray,0,1)[1])
//console.log(moveVertexAndAdjacency(myArray,1,2)[2])
//console.log(moveVertexAndAdjacency(myArray,2,3)[3])





//console.log(findRowTwo(myArray,4))



//console.log(myArray[1][1][1])


//console.log(deleteInBothRows(myArray,1,0)[0][2])
//console.log(testArray[0])
//console.log(testArray[1])
//console.log(testArray[2])
//console.log(testArray[3])


//console.log(deleteElement(myArray,1,0)[1])
//console.log(deleteElement(myArray,1,2)[1])
//console.log(deleteElement(myArray,2,1)[2])
//console.log(deleteInBothRows(myArray,2,1))
//console.log(findRandElement(7,myArray))
//console.log(countEdges(myArray))
//console.log(countVertices(myArray))