export function convertTokenToETH(tokenValue: number, decimalFactor: number = 18): string {
  const ethValue = tokenValue / 10 ** decimalFactor;
  return ethValue.toFixed(4); 
}
