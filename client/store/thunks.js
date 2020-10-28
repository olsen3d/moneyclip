import axios from 'axios'
import {loadAccountsAction, createAccountAction} from './actions'

const loadAccounts = accountId => async dispatch => {
  const accounts = (await axios.get(`/api/accounts/${accountId}`)).data
  return dispatch(loadAccountsAction(accounts))
}

const createAccount = account => async dispatch => {
  const newAccount = (await axios.post('/api/accounts', account)).data
  return dispatch(createAccountAction(newAccount))
}

export {loadAccounts, createAccount}
