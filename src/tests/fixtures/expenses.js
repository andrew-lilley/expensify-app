import moment from "moment";

export default [{
  id: '1',
  description: 'Gun',
  amount: 195,
  note: 'Present for brother',
  createdAt: 0
}, {
  id: '2',
  description: 'Rent',
  amount: 109500,
  note: 'Includes deposit',
  createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
  id: '3',
  description: 'Credit Card',
  amount: 4500,
  note: 'Included flight',
  createdAt: moment(0).add(4, 'days').valueOf()
}];