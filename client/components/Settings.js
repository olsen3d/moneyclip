import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {removeAccount, updateAccount} from '../store/thunks'
import history from '../history'

export default function Settings({account}) {
  const [name, setName] = useState('')
  const [nameCheck, setNameCheck] = useState(false)
  const [deleteCheck, setDeleteCheck] = useState(false)
  const dispatch = useDispatch()

  useEffect(
    () => {
      setDeleteCheck(false)
      setNameCheck(false)
      setName('')
    },
    [account]
  )

  const deleteAccount = () => {
    history.push('/accounts')
    dispatch(removeAccount(account.id))
  }

  const _updateAccount = () => {
    const newAccount = {...account}
    newAccount.name = name
    dispatch(updateAccount(newAccount))
    setNameCheck(false)
  }

  const exportCSV = () => {
    console.log('export CSV')
  }

  return (
    <div className="cardFull">
      <div>
        <span className="regularFont font16 header">Settings</span>
      </div>
      <div className="spacer" />
      <span className="lightFont">{account.name}</span>
      <div className="spacer" />
      <div className="spacer" />
      <div className="settingsButtons">
        <div>
          <button
            type="button"
            onClick={() => setNameCheck(true)}
            className="linkDark textButton"
          >
            Update Name
          </button>
          {nameCheck && (
            <React.Fragment>
              <span style={{margin: '0 1rem'}}>
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </span>
              <span style={{margin: '0 0.5rem'}}>
                <button
                  type="button"
                  onClick={_updateAccount}
                  className="linkDark textButton"
                >
                  UPDATE
                </button>
              </span>
              <span style={{margin: '0 0.5rem'}}>
                <button
                  type="button"
                  onClick={() => setNameCheck(false)}
                  className="linkDark textButton"
                >
                  CANCEL
                </button>
              </span>
            </React.Fragment>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => setDeleteCheck(true)}
            className="linkDark textButton"
          >
            Delete Account
          </button>
          {deleteCheck && (
            <React.Fragment>
              <span style={{margin: '0 1rem'}}>
                Permanently delete this account?
              </span>
              <span style={{margin: '0 0.5rem'}}>
                <button
                  type="button"
                  onClick={deleteAccount}
                  className="linkDark textButton"
                >
                  YES
                </button>
              </span>
              <span style={{margin: '0 0.5rem'}}>
                <button
                  type="button"
                  onClick={() => setDeleteCheck(false)}
                  className="linkDark textButton"
                >
                  NO
                </button>
              </span>
            </React.Fragment>
          )}
        </div>
        <button
          type="button"
          onClick={exportCSV}
          className="linkDark textButton"
        >
          Export account data to CSV
        </button>
      </div>
    </div>
  )
}
