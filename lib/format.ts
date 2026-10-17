export function sgd(amount: number, digits = 0) {
  const abs = Math.abs(amount).toLocaleString("en-SG", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return amount < 0 ? `-S$${abs}` : `S$${abs}`;
}

export function sgdSigned(amount: number, digits = 0) {
  if (amount > 0) return `+${sgd(amount, digits)}`;
  return sgd(amount, digits);
}

export function pct(value: number, digits = 1) {
  return `${value.toFixed(digits)}%`;
}
