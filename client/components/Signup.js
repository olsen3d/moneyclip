import React, {useState, useRef, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {auth} from '../store'
import socket from '../socket'
import axios from 'axios'

export default function Signup() {
  const error = useSelector(state => state.user.error)
  const [seeding, setSeeding] = useState(false)
  const [ready, setReady] = useState(false)
  const [progressMessage, setProgressMessage] = useState('Seeding data..')
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [progressPercent, setProgressPercent] = useState(0)
  const barRef = useRef(null)
  const dispatch = useDispatch()

  const loginAfterSeed = () => {
    console.log('login after seed', email, password)
    dispatch(auth(email, password, 'login'))
  }

  useEffect(() => {
    socket.on('progressMessage', message => {
      setProgressMessage(message)
    })

    socket.on('progressPercent', percent => {
      setProgressPercent(percent)
    })

    socket.on('startSeeding', _ => {
      setSeeding(true)
    })

    socket.on('loginOK', message => {
      setReady(true)
    })
  }, [])

  useEffect(
    () => {
      if (barRef.current) barRef.current.style.width = `${progressPercent}%`
    },
    [progressPercent]
  )

  useEffect(
    () => {
      if (ready) loginAfterSeed()
    },
    [ready]
  )

  if (seeding)
    return (
      <div id="landingPage">
        <img width="60%" src="/img/moneyclipLogo.png" />
        <div id="barContainer">
          <div id="bar" ref={barRef} />
        </div>
        <div className="progressMessages">
          <div className="white lightFont">{`${progressMessage}  `}</div>
          <div className="white regularFont">{`${progressPercent}%`}</div>
        </div>
      </div>
    )

  return (
    <div id="landingPage">
      <img width="60%" src="/img/moneyclipLogo.png" />
      <form>
        <div>
          <label htmlFor="email">
            <small className="white lightFont">Email</small>
          </label>
          <input
            onChange={e => setEmail(e.target.value)}
            name="email"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">
            <small className="white lightFont">Password</small>
          </label>
          <input
            onChange={e => setPassword(e.target.value)}
            name="password"
            type="password"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              const socketId = socket.id
              axios.post('/api/users/seed', {email, password, socketId})
            }}
            className="loginButton green4 white lightFont"
          >
            Signup
          </button>
        </div>
      </form>
      {error &&
        error.response && (
          <div className="orange lightFont"> {error.response.data} </div>
        )}
      <a href="/login" className="white lightFont">
        Login with an existing account
      </a>
    </div>
  )
}
