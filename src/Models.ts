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