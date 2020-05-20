import moment from "moment";
import { 
  setStartDate, 
  setEndDate, 
  sortByDate,
  sortByAmount,
  setTextFilter 
} from "../../actions/filters";

test('Should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toStrictEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  });
});

test('Should generate set end date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toStrictEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  });
});

test('Should generate sort by date action object', () => {
  const action = sortByDate();
  expect(action).toStrictEqual({
    type: 'SORT_BY_DATE'
  });
});

test('Should generate sort by amount action object', () => {
  const action = sortByAmount();
  expect(action).toStrictEqual({
    type: 'SORT_BY_AMOUNT'
  });
});

test('Should generate set sort by filter action object with provided value', () => {
  const text = 'Rent';
  const action = setTextFilter(text);
  expect(action).toStrictEqual({
    type: 'SET_TEXT_FILTER',
    text
  });
});

test('Should generate set sort by filter action object with default value', () => {
  const action = setTextFilter();
  expect(action).toStrictEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});