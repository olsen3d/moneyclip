import axios from 'axios'
import {
  loadAccountsAction,
  createAccountAction,
  removeAccountAction,
  updateAccountAction,
  createTransactionAction,
  loadNewsAction,
  loadWatchesAction,
  createWatchAction,
  removeWatchAction
} from './actions'

const loadAccounts = accountId => async dispatch => {
  const accounts = (await axios.get(`/api/accounts/${accountId}`)).data
  return dispatch(loadAccountsAction(accounts))
}

const createAccount = account => async dispatch => {
  const newAccount = (await axios.post('/api/accounts', account)).data
  return dispatch(createAccountAction(newAccount))
}

const updateAccount = account => async dispatch => {
  const updatedAccount = (await axios.put(
    `/api/accounts/${account.id}`,
    account
  )).data
  return dispatch(updateAccountAction(updatedAccount))
}

const removeAccount = id => async dispatch => {
  await axios.delete(`/api/accounts/${id}`)
  return dispatch(removeAccountAction(id))
}

const createTransaction = transaction => async dispatch => {
  const newTransaction = (await axios.post('/api/transaction', transaction))
    .data
  return dispatch(createTransactionAction(newTransaction))
}

const loadNews = _ => async dispatch => {
  let news = (await axios.get(`/api/finnhub/news`)).data
  news = news.filter((story, index) => index < 12)
  return dispatch(loadNewsAction(news))
}

const loadWatches = userId => async dispatch => {
  let watchList = (await axios.get(`/api/watches/${userId}`)).data
  return dispatch(loadWatchesAction(watchList))
}

const createWatch = watch => async dispatch => {
  const newWatch = (await axios.post(`/api/watches/new/${watch}`)).data
  return dispatch(createWatchAction(newWatch))
}

const removeWatch = id => async dispatch => {
  await axios.delete(`/api/watches/${id}`)
  return dispatch(removeWatchAction(id))
}

export {
  loadAccounts,
  createAccount,
  removeAccount,
  updateAccount,
  createTransaction,
  loadNews,
  loadWatches,
  createWatch,
  removeWatch
}
