import React from 'react'
import {Link} from 'react-router-dom'

export default function AccountSmallPreview({account}) {
  let accountImage = ''
  if (account.type === 'CHECKING') accountImage = '/img/checkingDark.png'
  if (account.type === 'SAVING') accountImage = '/img/savingDark.png'
  if (account.type === 'INVESTING') accountImage = '/img/investingDark.png'
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
