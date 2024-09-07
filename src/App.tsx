import './App.css'
import { useEffect, useState } from 'react';
import { CorrectState, RowData, RowValueData, RowState } from './Models';
import { Row } from './Typer';

function RowVal(value : string = '_', state : CorrectState = CorrectState.undefined) : RowValueData
{
  return {value: value, state: state};
}

// row data is inversed: 1st row is the last row
const rowData : RowData[] = [
  {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: RowState.untouched},
  {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: RowState.untouched},
  {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: RowState.untouched},
  {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: RowState.untouched},
  {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: RowState.typing},
]

const debugConstant = "3.141";

function IsValidInputKey(i : string) : boolean
{
  if (i == '0' || i == '1' || i == '2' || i == '3' || i == '4' || i == '5' || i == '6' || i == '7' || i == '8' || i == '9') return true;
  if (i == '.' || i == ',') return true;

  return false;
}

function App() {

  // this state is used to force re-render
  const [statesdds, setStatesdds] = useState(0);

  const rWrapperCountStyle: React.CSSProperties = { '--count': rowData.length } as any;

  // 1 means space 1 was added, 2 means both space 1 and space 2 was added
  // I need refference, thus it is wrapped in array
  let state = [0];

  const ValidateRow = (row : RowData) : boolean => {

    let valid : boolean = true;

    row.values.map((value, index) => {
      if (value.value == debugConstant[index]) value.state = CorrectState.correct;
      else if (debugConstant.search(value.value) !== -1) 
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

    if (ValidateRow(rowData[cId]))
    {
      alert("You won!");
    }

    rowData[cId].state = RowState.typed;

    if (cId !== 0)
    {
      rowData[cId - 1].state = RowState.typing;
    }    
    else 
    {
      alert("You lost! - if you wanna try again, just refresh the page");
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

  return (
    <>
      <h1>Constantle</h1>
      <p>It is like wordle, only a bit worse and for mathematical constants</p>

      <div className="rows-wrapper" style={rWrapperCountStyle}>
        {rowData.map((row_, index) => Row(row_, index, rowData.length + 1 - GetRowStyleId(row_, index, state), currentPos) )}
      </div>
    </>
  )
}

function GetRowStyleId(row : RowData, id: number, state : any[]) : number
{
  if (row.state === RowState.untouched) return id + state[0];
  if (row.state === RowState.typing) 
  { 
    state[0] += 1;
    return id + state[0]; 
  }
  
  if (row.state === RowState.typed && state[0] === 2) return id + state[0];

  state[0] += 1;
  return id + state[0]; 
}

export default App
