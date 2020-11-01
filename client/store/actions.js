import {
  LOAD_ACCOUNTS,
  CREATE_ACCOUNT,
  UPDATE_ACCOUNT,
  REMOVE_ACCOUNT,
  LOAD_TRANSACTIONS,
  CREATE_TRANSACTION,
  LOAD_NEWS
} from './conststants'

const loadAccountsAction = accounts => ({type: LOAD_ACCOUNTS, accounts})
const createAccountAction = account => ({type: CREATE_ACCOUNT, account})

const createTransactionAction = transaction => ({
  type: CREATE_TRANSACTION,
  transaction
})

const loadNewsAction = news => ({type: LOAD_NEWS, news})

export {
  loadAccountsAction,
  createAccountAction,
  createTransactionAction,
  loadNewsAction
}
