export function IsValidInputKey(i : string) : boolean
{
  if (i == '0' || i == '1' || i == '2' || i == '3' || i == '4' || i == '5' || i == '6' || i == '7' || i == '8' || i == '9') return true;
  if (i == '.' || i == ',') return true;

  return false;
}