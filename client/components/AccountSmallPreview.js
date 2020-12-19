import React from 'react'
import {Link} from 'react-router-dom'

export default function AccountSmallPreview({account}) {
  return (
    <div className="accountSmallPreview">
      <Link className="accountNavLink" to={`/accounts/${account.id}`}>
        {account.name}
      </Link>
    </div>
  )
}
