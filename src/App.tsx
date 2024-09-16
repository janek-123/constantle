import './App.css'
import { useEffect, useRef, useState } from 'react';
import { RowData, RowState, NewEmptyRowData } from './Models';
import { Row } from './Typer';
import { IsValidInputKey } from './Utils';
import { LooseScreen } from './components/LooseScreen';
import { Constant, GetRandomConstant } from './Constants';
import { HiddentInput } from './components/HiddenInput';
import { IsValidConstant, ValidateRow } from './Validator';

// digit count you need to guess
export const length = 4;
export const rowCount = 5;

let constant : Constant = GetRandomConstant();

export enum GameStatus {
  won,
  lost,
  playing
}

function App() {
  // row data is inversed: 1st row is the last row
  const [rowData, setRowData] = useState(NewEmptyRowData());

  const [gameStatus, setGameStatus] = useState(GameStatus.playing);

  const MoveTypingRowUp = () => {
    
    let cId = rowData.length - 1;

    while (rowData[cId].state !== RowState.typing) cId -= 1;

    rowData[cId].state = RowState.typed;

    if (ValidateRow(rowData[cId], constant))
    {
      setGameStatus(GameStatus.won);
      hiddenInputRef.current?.blur();
    }
    else
    {
      if (cId !== 0) rowData[cId - 1].state = RowState.typing;
      else
      {
        setGameStatus(GameStatus.lost);
        hiddenInputRef.current?.blur();
      }
    }
  }

  const [currentPos, setCurrentPos] = useState(-1);
  const [valuetoSet, setValuetoSet] = useState("");

  const handleKeyboardKeyPress = (event: any) => {
    if (hiddenInputRef.current && hiddenInputRef.current === document.activeElement) return;
    HandleInput(event.key);
  };

  const HandleInput = (key : string) => {

    if (key === 'Backspace')
    {
      setCurrentPos(currentPos => currentPos > -1 ? currentPos - 1 : currentPos);
      setValuetoSet("_backspace_");
      return;
    }

    if (currentPos === length - 1 || !IsValidInputKey(key)) return;

    if (key === ',') key = '.';

    setCurrentPos(currentPos => currentPos + 1);
    setValuetoSet(key);
  }

  useEffect(() => {
    for (let i = 0; i < rowData.length; i++)
    {
      if (rowData[i].state !== RowState.typing) continue;
      
      if (valuetoSet === "_backspace_")
      {
        setRowData(rowData => {
          const newRowData = [...rowData];
          newRowData[i].values[currentPos + 1].value = '_';
          return newRowData;
        });
      }
      else if (currentPos != -1)
      {
        setRowData(rowData => {
          const newRowData = [...rowData];
          newRowData[i].values[currentPos].value = valuetoSet;
          return newRowData;
        });
      }
    }
  }, [currentPos]);

  useEffect(() => {
    if (currentPos == rowData[0].values.length - 1)
    {
      let cId = rowData.length - 1;

      while (rowData[cId].state !== RowState.typing) cId -= 1;

      if (IsValidConstant(rowData[cId]))
      {
        setCurrentPos(-1);
        MoveTypingRowUp();
      }
      else {
        alert("Constant has to have exactly one decimal point");
      }
    }
  }, [rowData]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyboardKeyPress);
    };
  }, []);

  const ResetGame = () => {
    setGameStatus(GameStatus.playing);
    setRowData(NewEmptyRowData());
    constant = GetRandomConstant();
  }

  const HandleInputChange: React.FormEventHandler<HTMLInputElement> = () => {
    HandleInput(hiddenInputRef.current!.value);
  
    hiddenInputRef.current!.value = '';
  }

  const HandleKeyDown = (input : React.KeyboardEvent<HTMLInputElement>) => {
    
    if (input.key !== 'Backspace') return;

    HandleInput(input.key);

    hiddenInputRef.current!.value = '';
  }

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const gameOverClass = gameStatus == GameStatus.playing ? '' : ' game--over';

  const HandleWrapperClick = () => {
    hiddenInputRef.current?.focus();
  }

  return (
    <>
      <div className={'game' + gameOverClass}>
        <LooseScreen status={gameStatus} onPlayAgain={ResetGame} constant={constant} />
        <WordleHeader/>
        <HiddentInput hiddenInputRef={hiddenInputRef} HandleInputChange={HandleInputChange} HandleKeyDown={HandleKeyDown} />

        {PlayingField(HandleWrapperClick, currentPos, rowData)}      
      </div>
      <GithubLink />
    </>
  )
}

function GithubLink()
{
  return (
    <a href="https://github.com/janek-123/constantle" target="_blank" className="github-link">Github</a>
  )
}

const PlayingField = (HandleWrapperClick :  () => void, currentPos : number, rowData : RowData[]) =>
{
  const rWrapperCountStyle: React.CSSProperties = { '--count': rowData.length, "--widthCount": length } as any;

  // 1 means space 1 was added, 2 means both space 1 and space 2 was added
  // I need refference, thus it is wrapped in array
  let state = [0];

  return (
    <div className="rows-wrapper" style={rWrapperCountStyle} onClick={HandleWrapperClick}>
      {rowData[rowData.length - 1].state === RowState.typing ? <p className='type-text'>Type your constant and hope for the best :)</p> : <> </>}
      {rowData.map((row_, index) => Row(row_, index, rowData.length + 1 - GetRowStyleId(row_, index, state), currentPos) )}
    </div>
  )
}

const WordleHeader = () =>
{
  return (
    <>
      <h1>Constantle</h1>
      <p>It is like wordle, only a bit worse and for mathematical constants</p>
    </>
  )
}

function GetRowStyleId(row : RowData, id: number, state : any[]) : number
{
  if (row.state === RowState.untouched || (row.state === RowState.typed && state[0] === 2)) return id + state[0];

  state[0] += 1;  
  return id + state[0]; 
}

export default App
