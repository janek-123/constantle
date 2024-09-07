import './App.css'
import { useEffect, useState } from 'react';

enum State
{
  untouched,
  typing,
  typed
}

interface RowData {
  values: RowValueData[],
  state: State
}

enum CorrectState
{
  undefined,
  correct,
  incorrect,
  close,
}

interface RowValueData
{
  value: string,
  state: CorrectState
}

function RowVal(value : string = '_', state : CorrectState = CorrectState.undefined) : RowValueData
{
  return {value: value, state: state};
}

// row data is inversed: 1st row is the last row
const RowData : RowData[] = [
  {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: State.untouched},
  {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: State.untouched},
  {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: State.untouched},
  {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: State.untouched},
  {values: [RowVal(), RowVal(), RowVal(), RowVal()], state: State.typing},
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

  const rWrapperCountStyle: React.CSSProperties = { '--count': RowData.length } as any;

  // 1 means space 1 was added, 2 means both space 1 and space 2 was added
  // I need refference, thus it is wrapped in array
  let state = [0];

  const MoveTypingRowUp = () => {
    
    let cId = RowData.length - 1;

    while (RowData[cId].state !== State.typing) cId -= 1;

    RowData[cId].values.map((value, index) => {
      if (value.value == debugConstant[index]) value.state = CorrectState.correct;
      else if (debugConstant.search(value.value) !== -1) value.state = CorrectState.close;
      else value.state = CorrectState.incorrect;
    });

    RowData[cId].state = State.typed;
    RowData[cId - 1].state = State.typing;

    setStatesdds(statesdds + 1);
  }

  const [currentPos, setCurrentPos] = useState(-1);
  const [valuetoSet, setValuetoSet] = useState("");

  const handleKeyboardKeyPress = (event: any) => {

    if (event.key === 'Backspace')
    {
      alert("Backspace is not implemented yet");
    }

    if (!IsValidInputKey(event.key)) return;

    setCurrentPos(currentPos => currentPos + 1);
    setValuetoSet(event.key);
  };

  useEffect(() => {
    if (currentPos === -1) return;

    for (let i = 0; i < RowData.length; i++)
    {
      if (RowData[i].state === State.typing)
      {
        RowData[i].values[currentPos].value = valuetoSet;
        break;
      }
    }

    if (currentPos == RowData[0].values.length - 1)
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
        {RowData.map((row_, index) => Row(row_, index, RowData.length + 1 - GetRowStyleId(row_, index, state), currentPos) )}
      </div>
    </>
  )
}

function GetRowStyleId(row : RowData, id: number, state : any[]) : number
{
  if (row.state === State.untouched) return id + state[0];
  if (row.state === State.typing) 
  { 
    state[0] += 1;
    return id + state[0]; 
  }
  
  if (row.state === State.typed && state[0] === 2) return id + state[0];

  state[0] += 1;
  return id + state[0]; 
}

function Row(row : RowData, id : number, styleId : number, currentPos : number)
{
  const rWrapperIdStyle: React.CSSProperties = { '--index': styleId } as any;

  return (
    <div className='row' key={id} style={rWrapperIdStyle}>
      {row.values.map((value, index) => RowValue(value, index, row.state === State.typing && (index === currentPos + 1)))}
    </div>
  )
}

function RowValue(value : RowValueData, id : number, typing : boolean)
{
  const typingClass = typing ? 'num-disp--typing' : '';

  return(
    <div className={`num-disp ${typingClass} ${StateToClass(value.state)}`} key={id}>
      <p>{value.value}</p>
    </div>
  )
}

function StateToClass(state : CorrectState) : string
{
  if (state === CorrectState.correct) return 'num-disp--correct';
  if (state === CorrectState.incorrect) return 'num-disp--incorrect';
  if (state === CorrectState.close) return 'num-disp--close';

  return '';
}

export default App
