import React from 'react';
import PropTypes from 'prop-types';
import css from './Balance.module.css';

const Balance = ({ balance, income, expenses }) => (
  <section className={css.balanceSec}>
    <span className={css.income} role="img" aria-label="money+">
      <span>⬆</span> {income} $
    </span>
    <span className={css.expenses} role="img" aria-label="money-">
      <span>⬇</span>
      {expenses} $
    </span>
    <span className={css.balance}>Balance: {balance} $</span>
  </section>
);

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
};

export default Balance;
