import React from 'react'
import {Link} from 'react-router-dom'

export default function AccountSmallPreview({account}) {
  let accountImage = ''
  if (account.type === 'CHECKING') accountImage = '/img/checking.png'
  if (account.type === 'SAVING') accountImage = '/img/saving.png'
  if (account.type === 'INVESTING') accountImage = '/img/investing.png'
  return (
    <div className="accountSmallPreview">
      <div className="smallLogo">
        <img width="14px" height="14px" src={accountImage} />
      </div>
      <Link className="accountNavLink" to={`/accounts/${account.id}`}>
        {account.name}
      </Link>
    </div>
  )
}
