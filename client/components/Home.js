import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

export default function Home() {
  const user = useSelector(state => state.user)
  const accounts = useSelector(state => state.accounts)
  const dispatch = useDispatch()
  return (
    <div id="profile">
      <h3>{user.email}</h3>
      <ul />
    </div>
  )
}
