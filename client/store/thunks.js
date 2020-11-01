import axios from 'axios'
import {
  loadAccountsAction,
  createAccountAction,
  createTransactionAction,
  loadNewsAction
} from './actions'

const loadAccounts = accountId => async dispatch => {
  const accounts = (await axios.get(`/api/accounts/${accountId}`)).data
  return dispatch(loadAccountsAction(accounts))
}

const createAccount = account => async dispatch => {
  const newAccount = (await axios.post('/api/accounts', account)).data
  return dispatch(createAccountAction(newAccount))
}

const createTransaction = transaction => async dispatch => {
  const newTransaction = (await axios.post('/api/transaction', transaction))
    .data
  return dispatch(createTransactionAction(newTransaction))
}

const loadNews = _ => async dispatch => {
  let news = (await axios.get(`/api/finnhub/news`)).data
  news = news.filter((story, index) => index < 8)
  return dispatch(loadNewsAction(news))
}

export {loadAccounts, createAccount, createTransaction, loadNews}
