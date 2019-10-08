import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import css from './Dashboard.module.css';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import 'react-toastify/dist/ReactToastify.css';

export default class Dashboard extends Component {
  state = {
    balance: 5000,
    amount: '',
    transactions: [],
    income: 0,
    expenses: 0,
  };

  messages = {
    noMoney: 'На счету недостаточно средств для проведения операции!',
    inputNumber: 'Введите сумму для проведения операции!',
  };

  handleChange = e => {
    if (e.target.value === null) {
      toast.error(this.messages.inputNumber);
      return;
    }
    this.setState({ amount: e.target.value });
  };

  handlePlus = e => {
    const { name } = e.target;
    const { balance, amount } = this.state;
    if (amount === '' || amount === '') {
      toast.error(this.messages.inputNumber);
      return;
    }
    if (amount > '0') {
      this.setState(state => ({ income: state.income + +amount }));

      const plus = balance + +amount;
      this.setState({ balance: plus });

      const newTransaction = {
        id: shortid.generate(),
        type: name,
        amount,
        date: new Date().toLocaleString('en-US', { hour12: false }),
      };
      this.setState(state => ({
        transactions: [...state.transactions, newTransaction],
      }));
    }
    this.reset();
  };

  handleMinus = e => {
    const { name } = e.target;
    const { balance, amount } = this.state;
    if (balance < +amount) {
      toast.error(this.messages.noMoney);
      return;
    }

    if (amount === null || amount === '') {
      toast.error(this.messages.inputNumber);
      return;
    }
    if (amount > 0) {
      this.setState(state => ({ expenses: state.expenses + +amount }));

      const minus = balance - +amount;
      this.setState({ balance: minus });

      const newTransaction = {
        id: shortid.generate(),
        type: name,
        amount,
        date: new Date().toLocaleString('en-US', { hour12: false }),
      };
      this.setState(state => ({
        transactions: [...state.transactions, newTransaction],
      }));
    }
    this.reset();
  };

  reset = () => {
    this.setState({ amount: '' });
  };

  render() {
    const { transactions, balance, income, expenses, amount } = this.state;
    return (
      <div className={css.dashboard}>
        <Controls
          handleChange={this.handleChange}
          value={amount}
          handlePlus={this.handlePlus}
          handleMinus={this.handleMinus}
        />
        <hr />
        <Balance balance={balance} income={income} expenses={expenses} />
        <hr />
        <TransactionHistory transactions={transactions} />
        <ToastContainer autoClose={2500} position="bottom-right" />
      </div>
    );
  }
}
