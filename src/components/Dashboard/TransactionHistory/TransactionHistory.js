import React from 'react';
import PropTypes from 'prop-types';
import css from './TransactionHistory.module.css';

const TransactionHistory = ({ transactions }) => {
  return (
    <table className={css.history}>
      <thead className={css.head}>
        <tr>
          <th>Transaction</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody className={css.body}>
        {/* <tr>
          <td>Deposit</td>
          <td>200$</td>
          <td>4/17/2019, 12:45:17</td>
        </tr>
        <tr>
          <td>Withdrawal</td>
          <td>100$</td>
          <td>4/18/2019, 14:15:23</td>
        </tr> */}
        {transactions.map(elem => (
          <tr key={elem.id}>
            <td>{elem.type}</td>
            <td>{elem.amount}$</td>
            <td>{elem.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      date: PropTypes.date,
    }),
  ).isRequired,
};

export default TransactionHistory;
