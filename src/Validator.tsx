import { Constant } from './Constants';
import { CorrectState, RowData } from './Models';
import { length } from './App';

export function ValidateRow(row : RowData, constant : Constant) : boolean 
{
  let valid : boolean = true;

  row.values.map((value, index) => {
    if (value.value == constant.value[index])
    {
      value.state = CorrectState.correct;
    }
    else if (constant.value.slice(0, length).search(value.value) !== -1) 
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

export function IsValidConstant(row : RowData) : boolean
{
  const value = row.values.map((value) => value.value).join('');

  let dotCount = 0;

  for (let i = 0; i < value.length; i++)
  {
    if (value[i] === '.') dotCount += 1;
    if (dotCount > 1) return false;
  }

  return dotCount == 1;
}
