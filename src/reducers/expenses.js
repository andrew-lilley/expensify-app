// Expenses reducer.
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // Use ES6 spread operator.
      return [
        ...state,
        action.expense
      ];

    case 'REMOVE_EXPENSE':
      // Use filter to remove item and ES6 destructuring.
      return state.filter(({ id }) => id !== action.id);

    case 'EDIT_EXPENSE':

      return state.map((expense) => {
        if (expense.id === action.id) {
          // Use spreading objects. (babel, transform-object-rest-spread)
          return {
            ...expense,
            ...action.updates
          };
        }
        else {
          return expense;
        }
      });

    case 'SET_EXPENSES':
      return action.expenses;
  
    default:
      return state;
  }
};