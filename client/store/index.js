import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
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

const accountsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_ACCOUNTS:
      return action.accounts
    default:
      return []
  }
}

const reducer = combineReducers({user, accounts: accountsReducer})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
