import { login, logout } from "../../actions/auth";

test('Should generate login action object', () => {
  const uid = 'abc123';
  const action = login(uid);
  expect(action).toStrictEqual({
    type: 'LOGIN',
    uid
  });
});

test('Should generate logout action object', () => {
  const action = logout();
  expect(action).toStrictEqual({
    type: 'LOGOUT'
  });
});