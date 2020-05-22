import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import 'numeral/locales/en-gb';
numeral.locale('en-gb');
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
  return (
    <div>
      <p>Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}</p>
    </div>
  )
};

const mapStatetoProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

// Connect component to the redux store.
export default connect(mapStatetoProps)(ExpensesSummary);