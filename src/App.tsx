import './App.css'
import { useEffect, useState } from 'react';
import { CorrectState, RowData, RowValueData, RowState } from './Models';
import { Row } from './Typer';
import { IsValidInputKey } from './Utils';
import { LooseScreen } from './LooseScreen';
import { constants, Constant } from './Constants';

function RowVal(value : string = '_', state : CorrectState = CorrectState.undefined) : RowValueData
{
  return {value: value, state: state};
}

// row data is inversed: 1st row is the last row
let rowData : RowData[] = NewRowData();

function NewRowData() : RowData[]
{
  return [
    {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: RowState.untouched},
    {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: RowState.untouched},
    {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: RowState.untouched},
    {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: RowState.untouched},
    {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: RowState.typing},
  ]
}

let constant : Constant = constants[Math.floor(Math.random() * constants.length)];

enum GameStatus {
  won,
  lost,
  playing
}

function App() {

  // this state is used to force re-render
  const [statesdds, setStatesdds] = useState(0);

  const [gameStatus, setGameStatus] = useState(GameStatus.playing);

  const rWrapperCountStyle: React.CSSProperties = { '--count': rowData.length } as any;

  // 1 means space 1 was added, 2 means both space 1 and space 2 was added
  // I need refference, thus it is wrapped in array
  let state = [0];

  const ValidateRow = (row : RowData) : boolean => {

    console.log(`Validating row: ${row.values.map((value) => value.value)}`);

    let valid : boolean = true;

    row.values.map((value, index) => {
      if (value.value == constant.value[index]) value.state = CorrectState.correct;
      else if (constant.value.search(value.value) !== -1) 
      {
        value.state = CorrectState.close;
        valid = false;
      }
      else 
      {
        value.state = CorrectState.incorrect;
        valid = false;
      }
    });

    return valid;
  }

  const MoveTypingRowUp = () => {
    
    let cId = rowData.length - 1;

    while (rowData[cId].state !== RowState.typing) cId -= 1;

    rowData[cId].state = RowState.typed;

    if (ValidateRow(rowData[cId]))
    {
      setGameStatus(GameStatus.won);
    }
    else
    {
      if (cId !== 0)
      {
        rowData[cId - 1].state = RowState.typing;
      }    
      else 
      {
        setGameStatus(GameStatus.lost);
      }
    } 

    setStatesdds(statesdds + 1);
  }

  const [currentPos, setCurrentPos] = useState(-1);
  const [valuetoSet, setValuetoSet] = useState("");

  const handleKeyboardKeyPress = (event: any) => {

    if (event.key === 'Backspace')
    {
      setCurrentPos(currentPos =>currentPos > -1 ? currentPos - 1 : currentPos);
      setValuetoSet("_backspace_");
      return;
    }

    if (!IsValidInputKey(event.key)) return;

    setCurrentPos(currentPos => currentPos + 1);
    setValuetoSet(event.key);
  };

  useEffect(() => {
    for (let i = 0; i < rowData.length; i++)
    {
      if (rowData[i].state !== RowState.typing) continue;
      
      if (valuetoSet === "_backspace_")
      {
        rowData[i].values[currentPos + 1].value = '_';
        console.log(currentPos + 1);
      }
      else if (currentPos != -1)
      {
        rowData[i].values[currentPos].value = valuetoSet;
      }
    }

    if (currentPos == rowData[0].values.length - 1)
    {      
      setCurrentPos(-1);
      MoveTypingRowUp();
    }

    setStatesdds(statesdds + 1);

  }, [currentPos]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyboardKeyPress);
    };
  }, []);

  const g = gameStatus == GameStatus.playing ? '' : 'game--over';

  const ResetGame = () => {
    setGameStatus(GameStatus.playing);
    rowData = NewRowData();
    constant = constants[Math.floor(Math.random() * constants.length)];
  }

  return (
    <div className={'game ' + g}>
      {LooseScreen(gameStatus == GameStatus.won, gameStatus == GameStatus.playing, ResetGame, constant)}
      <h1>Constantle</h1>
      <p>It is like wordle, only a bit worse and for mathematical constants</p>

      <div className="rows-wrapper" style={rWrapperCountStyle}>
        {rowData[rowData.length - 1].state === RowState.typing ? <p>Type your constant and hope for the best :)</p> : <> </>}
        {rowData.map((row_, index) => Row(row_, index, rowData.length + 1 - GetRowStyleId(row_, index, state), currentPos) )}
      </div>
    </div>
  )
}

function GetRowStyleId(row : RowData, id: number, state : any[]) : number
{
  if (row.state === RowState.untouched || (row.state === RowState.typed && state[0] === 2)) return id + state[0];

  state[0] += 1;  
  return id + state[0]; 
}

export default App
