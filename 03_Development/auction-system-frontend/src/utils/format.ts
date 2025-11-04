// Utility Functions - Formatting
// TODO: Add functions for date, currency, text formatting

export const formatCurrency = (amount: number) => {
  return `${amount.toLocaleString()} VND`;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};
