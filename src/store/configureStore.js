import { createStore, combineReducers } from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";

// Store creation.
export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    // Allows you to use console in Chrome.
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};