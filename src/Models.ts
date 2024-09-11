import { length, rowCount } from "./App";

export enum RowState
{
  untouched,
  typing,
  typed
}

export interface RowData {
  values: RowValueData[],
  state: RowState
}

export function NewEmptyRowData() : RowData[]
{
  let data : RowData[] = [];

  for (let i = 0; i < rowCount; i++)
  {
    if (i === rowCount - 1)
    {
      data.push({values: NewEmptyRowValues(), state: RowState.typing});
      continue;
    }

    data.push({values: NewEmptyRowValues(), state: RowState.untouched});
  }

  return data;
}

export enum CorrectState
{
  undefined,
  correct,
  incorrect,
  close,
}

export interface RowValueData
{
  value: string,
  state: CorrectState
}

function NewEmptyRowValues() : RowValueData[]
{
  let values : RowValueData[] = [];

  for (let i = 0; i < length; i++)
    values.push(NewEmptyRowVal());

  return values;
}

function NewEmptyRowVal() : RowValueData
{
  return {value: '_', state: CorrectState.undefined};
}