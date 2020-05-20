import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test('Should set up default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT'});
  expect(state).toStrictEqual([]);
});

test('Should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action);
  expect(state).toStrictEqual([expenses[0], expenses[2]]);
});

test('Should not emove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }
  const state = expensesReducer(expenses, action);
  expect(state).toStrictEqual([expenses[0], expenses[1], expenses[2]]);
});


test('Should add an expense', () => {
  const expense = {
    id: "109",
    description: 'Laptop',
    amount: 29500,
    note: '',
    createdAt: 20000
  };

  const action = {
    type: 'ADD_EXPENSE',
    expense
  };

  const state = expensesReducer(expenses, action);
  expect(state).toStrictEqual([...expenses, expense]);
});

test('Should edit an expense', () => {
  const description = 'Coffee';

  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      description
    }
  }

  const state = expensesReducer(expenses, action);
  expect(state[0].description).toBe('Coffee');
});

test('Should not edit an expense if expense not found', () => {
  const description = 'Coffee';

  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      description
    }
  }

  const state = expensesReducer(expenses, action);
  expect(state).toStrictEqual(expenses);
});