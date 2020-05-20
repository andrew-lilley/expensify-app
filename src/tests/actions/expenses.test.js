import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test('Should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toStrictEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
});

test('Should setup edit expense action object', () => {
  const action = editExpense('123abc', { description: "Rent", amount: 150000 });
  expect(action).toStrictEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      description: "Rent",
      amount: 150000
    }
  })
});

test('Should setup add expense action object with provided values', () => {
  const expenseData = {
    description: "Rent",
    amount: 150000,
    createdAt: 1000,
    note: "This includes the deposit"
  };

  const action = addExpense(expenseData);
  expect(action).toStrictEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('Should setup add expense action object with default values', () => {
  const action = addExpense();
  expect(action).toStrictEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  });
});