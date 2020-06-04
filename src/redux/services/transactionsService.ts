import { handleResponse } from '../../util/serverResponse';
import axios from 'axios';
import { Transaction } from '../../models/Shared';

export const transactionsService = {
  fetchTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};

function fetchTransactions(): Promise<Transaction[]> {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/transactions/`
    )
    .then(handleResponse);
}
function getTransaction(transactionId: number): Promise<Transaction> {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/transactions/${transactionId}`
    )
    .then(handleResponse);
}
function createTransaction(transaction: Transaction): Promise<Transaction> {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/transactions/`,
      transaction
    )
    .then(handleResponse);
}
function updateTransaction(transaction: Transaction): Promise<Transaction> {
  return axios
    .patch(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/transactions/${transaction.id}`,
      transaction
    )
    .then(handleResponse);
}
function deleteTransaction(transactionId): Promise<Transaction> {
  return axios
    .delete(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}/transactions/${transactionId}`
    )
    .then(handleResponse);
}
