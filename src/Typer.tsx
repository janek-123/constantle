import { CorrectState, RowData, RowValueData, RowState } from './Models';

export function Row(row : RowData, id : number, styleId : number, currentPos : number)
{
  const rWrapperIdStyle: React.CSSProperties = { '--index': styleId } as any;

  return (
    <div className='row' key={id} style={rWrapperIdStyle}>
      {row.values.map((value, index) => RowValue(value, index, row.state === RowState.typing && (index === currentPos + 1)))}
    </div>
  )
}

function RowValue(value : RowValueData, id : number, typing : boolean)
{
  const typingClass = typing ? 'num-disp--typing' : '';

  const valueClass = value.value !== '_' ? 'num-disp--filled' : '';

  return(
    <div className={`num-disp ${valueClass} ${typingClass} ${StateToClass(value.state)}`} key={id}>
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