export interface TripQuery {
  amount?: number;
}

export const parseTripQuery = (query: any): TripQuery => {
  const { amount: amountStr } = query;
  return { amount: parseAmount(amountStr) };
};

const parseAmount = (amount: any): number | undefined => {
  const parsedAmount = parseInt(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) return undefined;

  return parsedAmount;
};
