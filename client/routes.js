import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  Home,
  Accounts,
  AccountOverview,
  NewsFeed,
  WatchList
} from './components'
import {me} from './store'
import {loadAccounts, loadWatches} from './store/thunks'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      if (this.props.user.id) {
        this.props.loadMyAccounts(this.props.user.id)
        this.props.loadMyWatchList(this.props.user.id)
      }
    }
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home" component={Home} />
            <Route path="/news" component={NewsFeed} />
            <Route path="/watchlist" component={WatchList} />
            <Route exact path="/accounts" component={Accounts} />
            <Route path="/accounts/:id" component={AccountOverview} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadMyAccounts(userId) {
      dispatch(loadAccounts(userId))
    },
    loadMyWatchList(userId) {
      dispatch(loadWatches(userId))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
