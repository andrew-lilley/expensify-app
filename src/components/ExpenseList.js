import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

// Export so that the component can be tested.
export const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.length <= 0 && <p>There are no expenses matching your search.</p>}
    {props.expenses.map((expense) => {
      return <ExpenseListItem key={expense.id} {...expense} store={props} />
    })}
  </div>
);

const mapStatetoProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

// Connect component to the redux store.
export default connect(mapStatetoProps)(ExpenseList);