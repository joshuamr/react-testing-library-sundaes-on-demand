/**
 * Format number as US Dollars
 * @param currency
 * @returns {string} number formatted as currency
 *
 * @example
 *  formatCurrency(0)
 *  // => $0.00
 */
export function formatCurrency(currency: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(currency);
}

export function determineScoopInputIsValid(inputValue: number) {
  return (
    inputValue < 10 &&
    inputValue >= 0 &&
    !isNaN(inputValue) &&
    parseInt(String(inputValue)) === inputValue
  );
}
