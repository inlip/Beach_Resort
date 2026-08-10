export const USD_TO_INR = 86.5;

export function inrToUsd(inr: number) {
  return inr / USD_TO_INR;
}

export function formatUsdFromInr(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(inrToUsd(value));
}

export function formatInr(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDualCurrency(value: number) {
  return `${formatInr(value)} / ${formatUsdFromInr(value)}`;
}
