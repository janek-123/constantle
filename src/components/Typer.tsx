import { FC } from 'react';
import { RowData, RowState } from '../Models';
import { Row } from './Row';
import { length } from '../App';

type TyperProps = {
    HandleWrapperClick :  () => void, 
    currentPos : number, 
    rowData : RowData[]
}

export const Typer : FC<TyperProps> = ({HandleWrapperClick, currentPos, rowData}) =>
{
  const rWrapperCountStyle: React.CSSProperties = { '--count': rowData.length, "--widthCount": length } as any;

  // 1 means space 1 was added, 2 means both space 1 and space 2 was added
  // I need refference, thus it is wrapped in array
  let state = [0];

  return (
    <div className="rows-wrapper" style={rWrapperCountStyle} onClick={HandleWrapperClick}>
    {rowData[rowData.length - 1].state === RowState.typing ? <p className='type-text'>Type your constant and hope for the best :)</p> : <> </>}
    {rowData.map((row_, index) =>
      <Row key={index}row={row_} styleId={rowData.length + 1 - GetRowStyleId(row_, index, state)} currentPos={currentPos} />
    )}
    </div>
  )
}

function GetRowStyleId(row : RowData, id: number, state : any[]) : number
{
  if (row.state === RowState.untouched || (row.state === RowState.typed && state[0] === 2)) return id + state[0];

  state[0] += 1;  
  return id + state[0]; 
}