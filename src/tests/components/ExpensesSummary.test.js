import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";

test('Should correctly return count and total for a single expense', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={145} />);
  expect(wrapper).toMatchSnapshot(); 
});

test('Should correctly return count and total for multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={3} expensesTotal={1445} />);
  expect(wrapper).toMatchSnapshot();
});