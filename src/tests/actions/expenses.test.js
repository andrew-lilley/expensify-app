import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

// Add test data to test Firebase database.
beforeEach((done) => {

  const expensesData = {};
  expenses.forEach(({id, description, note, amount, createdAt }) => {
    expensesData[id] = {
      description,
      note,
      amount,
      createdAt
    }
  });

  database.ref('expenses').set(expensesData).then(() => done());
});

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
  const action = addExpense(expenses[2]);
  expect(action).toStrictEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

// Using 'done' allows us to test an asynchronous actions.
// Jest waits for the done function to be called.
test('Should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  }

  // Use promise chaining.
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toStrictEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    // Return the data to the next promise.
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');

  }).then((snapshot) => {
    expect(snapshot.val()).toStrictEqual(expenseData);
    done();
  });
});

test('Should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  // Use promise chaining.
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toStrictEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });

    // Return the data to the next promise.
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');

  }).then((snapshot) => {
    expect(snapshot.val()).toStrictEqual(expenseDefaults);
    done();
  });
});

test('Should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toStrictEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('Should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toStrictEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});