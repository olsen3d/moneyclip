import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {loadWatch} from './thunks'
import user from './user'
import {
  LOAD_ACCOUNTS,
  CREATE_ACCOUNT,
  UPDATE_ACCOUNT,
  REMOVE_ACCOUNT,
  CREATE_TRANSACTION,
  LOAD_NEWS,
  LOAD_WATCHES,
  CREATE_WATCH,
  REMOVE_WATCH
} from './conststants'

const accountsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_ACCOUNTS:
      return action.accounts
    case CREATE_ACCOUNT:
      return [...state, action.account]
    case REMOVE_ACCOUNT:
      return state.filter(account => account.id !== action.id)
    case UPDATE_ACCOUNT:
      console.log(action)
      return state.map(
        account => (account.id === action.account.id ? action.account : account)
      )
    case CREATE_TRANSACTION:
      return state.map(acc => {
        if (acc.id === action.transaction.id) return action.transaction
        else return acc
      })
    default:
      return state
  }
}

const newsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_NEWS:
      return action.news
    default:
      return state
  }
}

const watchListReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_WATCHES:
      return [...action.watchList]
    case CREATE_WATCH:
      return [action.watch, ...state]
    default:
      return state
  }
}

const reducer = combineReducers({
  user,
  accounts: accountsReducer,
  news: newsReducer,
  watches: watchListReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
