import { FC } from 'react';
import { CorrectState, RowData, RowValueData, RowState } from '../Models';

type RowProps = {
  row: RowData,
  styleId : number,
  currentPos : number
}

export const Row : FC<RowProps> = ({row, styleId, currentPos}) =>
{
  const rWrapperIdStyle: React.CSSProperties = { '--index': styleId } as any;

  return (
    <div className='row' style={rWrapperIdStyle}>
      {row.values.map((value, index) => 
        <RowValue key={index} value={value} typing={row.state === RowState.typing && (index === currentPos + 1)}/>)
      }
    </div>
  )
}

type RowValueProps = {
  value : RowValueData,
  typing : boolean
}

const RowValue : FC<RowValueProps> = ({value, typing}) =>
{
  const typingClass = typing ? 'num-disp--typing' : '';

  const valueClass = value.value !== '_' ? 'num-disp--filled' : '';

  return(
    <div className={`num-disp ${valueClass} ${typingClass} ${StateToClass(value.state)}`}>
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