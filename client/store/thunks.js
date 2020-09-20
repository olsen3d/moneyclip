import axios from 'axios'
import {loadAccountsAction} from './actions'

const loadAccounts = accountId => async dispatch => {
  const accounts = (await axios.get(`/api/accounts/${accountId}`)).data
  return dispatch(loadAccountsAction(accounts))
}

export {loadAccounts}
