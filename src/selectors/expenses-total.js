// Get the total for all expenses passed in.
export default (expenses) => {
  return expenses
    .map((expense) => expense.amount)
    .reduce((sum, value) => sum + value, 0);
};