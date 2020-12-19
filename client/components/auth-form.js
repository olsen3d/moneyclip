import React, {useState, useRef} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import socket from '../socket'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const [seeding, setSeeding] = useState(false)
  const [progressMessage, setProgressMessage] = useState(
    'Seeding data please wait...'
  )
  const [progressPercent, setProgressPercent] = useState(0)
  const barRef = useRef()

  socket.on('progressMessage', message => {
    setProgressMessage(message)
  })

  socket.on('progressPercent', percent => {
    setProgressPercent(percent)
    barRef.current.style.width = `${progressPercent}%`
  })

  if (seeding)
    return (
      <div id="landingPage">
        <img width="60%" src="/img/moneyclipLogo.png" />
        <div id="barContainer">
          <div id="bar" ref={barRef} />
        </div>
        <div className="progressMessages">
          <span className="white lightFont">{`${progressMessage}  `}</span>
          <span className="white regularFont">{`${progressPercent}%`}</span>
        </div>
      </div>
    )

  return (
    <div id="landingPage">
      <img width="60%" src="/img/moneyclipLogo.png" />
      <form
        onSubmit={e => {
          if (name === 'signup') setSeeding(true)
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
        <div>
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
