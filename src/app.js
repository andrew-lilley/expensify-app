import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";

import { addExpense } from "./actions/expenses"
import { setTextFilter } from "./actions/filters"
import getVisibleExpenses from "./selectors/expenses";


import 'normalize.css/normalize.css';
import './styles/styles.scss';
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

store.dispatch(addExpense({ description: 'Water Bill', amount: 3000, createdAt: 101 }));
store.dispatch(addExpense({ description: 'Gas Bill', amount: 600, createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 198200, createdAt: 100 }));

/*
store.dispatch(setTextFilter('bill'));

const stateOne = store.getState();
const visibleExpensesOne = getVisibleExpenses(stateOne.expenses, stateOne.filters);

console.log(visibleExpensesOne);
*/

/*
setTimeout(() => {
  store.dispatch(addExpense({ description: 'Electric Bill', amount: 900, createdAt: 400 }));

  store.dispatch(setTextFilter('bill'));

  const stateTwo = store.getState();
  const visibleExpensesTwo = getVisibleExpenses(stateTwo.expenses, stateTwo.filters);

  console.log(visibleExpensesTwo);
}, 3000);
*/

const jsx = (
  <Provider store={store}>
    < AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));