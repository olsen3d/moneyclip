import {
  LOAD_ACCOUNTS,
  CREATE_ACCOUNT,
  UPDATE_ACCOUNT,
  REMOVE_ACCOUNT,
  LOAD_TRANSACTIONS,
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  REMOVE_TRANSACTION
} from './conststants'

const loadAccountsAction = accounts => ({type: LOAD_ACCOUNTS, accounts})
const createAccountAction = account => ({type: CREATE_ACCOUNT, account})

export {loadAccountsAction, createAccountAction}
