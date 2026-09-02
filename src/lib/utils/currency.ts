export function formatPriceKsh(value: number): string {
  return `KSh ${value.toLocaleString('en-KE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
