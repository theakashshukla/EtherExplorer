export function convertTokenToETH(tokenValue: number, decimalFactor: number): number {
  const ethValue = tokenValue / decimalFactor;
  return ethValue;
}
