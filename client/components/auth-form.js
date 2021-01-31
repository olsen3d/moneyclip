import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="landingPage">
      <img id="signupImg" src="/img/moneyclipLogo.png" />
      <form
        onSubmit={e => {
          handleSubmit(e)
        }}
        name={name}
      >
        <div>
          <label htmlFor="email">
            <small className="white lightFont">Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small className="white lightFont">Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div className="loginButtonContainer">
          <button type="submit" className="loginButton green4 white lightFont">
            {displayName}
          </button>
        </div>
      </form>
      {error &&
        error.response && (
          <div className="orange lightFont"> {error.response.data} </div>
        )}
      {name === 'login' ? (
        <a href="/signup" className="white lightFont">
          Make a new account
        </a>
      ) : (
        <a href="/login" className="white lightFont">
          Login with an existing account
        </a>
      )}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchLogin = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

const mapDispatchSignup = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    },
    loginAfterSeed(email, password) {
      dispatch(auth(email, password, 'login'))
    }
  }
}

export const Login = connect(mapLogin, mapDispatchLogin)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchSignup)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
