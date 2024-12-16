import Tile from "./Tile";
import { useState, useEffect } from "react";
import './Styling/TileBoard.css';

const config ={
  "rows" : 2,
  "columns" :3
}


const initalizeGrid= () => {
  const rows = config.rows
  const columns = config.columns
  let grid = []
  let numbers = [...Array(rows * columns).keys()]
  numbers = shuffleArray(numbers)
  let index = 0
  for (let a = 0; a < rows; a++) {
      let rowList = []
      for (let b = 0; b < columns; b++) {
        
        rowList.push({row: a,col: b, number: numbers[index]})  
        index +=1
      }
      grid.push(rowList)
  }
  return grid
}

const moveTiles = (currentPos, grid, setGrid) =>{
  let newGrid = [...grid]
  let emptyPos =  newGrid.flat().find( pos => pos.number===0)

  if (currentPos['row'] !== emptyPos['row'] && currentPos['col'] !== emptyPos['col']) {
    return
  }

   /* Move tiles to the empty tile position and set the empty tile to the current tile position*/
  if (currentPos['row'] === emptyPos['row']){
     
     
      let i = 1
      if  (emptyPos["col"] > currentPos["col"]){
         i = -1
      }
 
      for (let c = emptyPos["col"]; c !== currentPos["col"]; c+=i){
          newGrid[currentPos['row']][c]['number'] = newGrid[currentPos['row']][c+i]['number']     
      }
  }
  else if (currentPos['col'] === emptyPos['col']){
    /* Move tiles in the row */
    let i = 1
    if  (emptyPos["row"] > currentPos["row"]){
        i = -1
    }
    for (let r = emptyPos["row"]; r !== currentPos["row"]; r+=i){
        
        newGrid[r][currentPos['col']]['number'] = newGrid[r+i][currentPos['col']]['number']
        
    }
    newGrid[currentPos['row']][currentPos['col']]['number']= 0
  };
  newGrid[currentPos['row']][currentPos['col']]['number']= 0
  setGrid(newGrid);
}

const isComplete = (grid) => {
  let numbers = grid.flat().map ( (tile) => 
      tile.number
  );
  let sortedNumbers = [...numbers]
  sortedNumbers = sortedNumbers.filter(item => item !== 0);
  sortedNumbers.sort((a, b) => a - b);
  sortedNumbers.push(0)
  const completed = numbers.every((value, index) => value === sortedNumbers[index])
  
  if (completed) {
    alert("You completed the puzzle! 🎉 Shuffling the board again 🥴")
    return true;
  }
}
const shuffleArray = (array) => {
  for (let i = 0; i < array.length; i++) { 

    const j = Math.floor(Math.random() * (i));
    
    // Switch content in current index with random index
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array
}

function TileBoard() {

  const [grid, setGrid] = useState([]);

  const onMoveTileHandler= (tilePos) =>{
    const currentPos = {
      ...tilePos
    }
    moveTiles(currentPos, grid, setGrid)
  }

  const onShuffle= (e) =>
  {
     setGrid(initalizeGrid()); 
  }
  
    // Each time the rows or columns is changed the grid will be rerendered
  useEffect(() => {
    setGrid(initalizeGrid());
  }, [config]);


  useEffect(() => {
    if (isComplete(grid)){
      setGrid(initalizeGrid())
    }
  }, [grid]);
  
  const  gridStyle = {
    "gridTemplateRows": "repeat("+config.rows+", minmax(10x, 1fr))",
    "gridTemplateColumns": "repeat("+config.columns+", minmax(10px, 1fr))"
  } ;
  

  return (
    <div>
      <button onClick={onShuffle}> Shuffle the board 🔀</button>
      <div className="grid-container" style = {gridStyle}>
      {grid.flat().map ( (pos) => 
        <div className="grid-item">
          <Tile position= {pos} onMoveTile = {onMoveTileHandler}></Tile>
        </div>)}
      </div>,
  </div>
  );
}

export default TileBoard;
