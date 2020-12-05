/* eslint-disable complexity */
import React from 'react'
import {Link} from 'react-router-dom'

export default function AccountPreview({account, linkable}) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  let accountImage = ''
  if (account.type === 'CHECKING') accountImage = '/img/checkingLight.png'
  if (account.type === 'SAVING') accountImage = '/img/savingLight.png'
  if (account.type === 'INVESTING') accountImage = '/img/investingLight.png'
  return linkable ? (
    <Link className="cardFullLink" to={`/accounts/${account.id}`}>
      <div className="accountOverviewContainer">
        <div className="accountLogo">
          <img width="42px" height="42px" src={accountImage} />
          <div className="accountName">
            <p className="regularFont font16">{account.name}</p>
            <p className="lightFont">{account.type}</p>
          </div>
        </div>
        {account.type === 'SAVING' || account.type === 'INVESTING' ? (
          <div className="accountEarnings">
            <span className="regularFont font16">
              {formatter.format(account.net * 0.01)}
            </span>
            <span className="lightFont">Net Deposit</span>
          </div>
        ) : null}
        {account.type === 'SAVING' || account.type === 'INVESTING' ? (
          <div className="accountEarnings">
            <span className="regularFont font16">
              {formatter.format(account.earnings * 0.01)}
            </span>
            <span className="lightFont">Earnings</span>
          </div>
        ) : null}
        <div className="accountBalance">
          <span className="regularFont font16">
            {formatter.format(account.balance * 0.01)}
          </span>
          <span className="lightFont">Balance</span>
        </div>
      </div>
    </Link>
  ) : (
    <div className="cardFull">
      <div className="accountOverviewContainer">
        <div className="accountLogo">
          <img width="42px" height="42px" src={accountImage} />
          <div className="accountName">
            <p className="regularFont font16">{account.name}</p>
            <p className="lightFont">{account.type}</p>
          </div>
        </div>
        {account.type === 'SAVING' || account.type === 'INVESTING' ? (
          <div className="accountEarnings">
            <span className="regularFont font16">
              {formatter.format(account.net * 0.01)}
            </span>
            <span className="lightFont">Net Deposit</span>
          </div>
        ) : null}
        {account.type === 'SAVING' || account.type === 'INVESTING' ? (
          <div className="accountEarnings">
            <span className="regularFont font16">
              {formatter.format(account.earnings * 0.01)}
            </span>
            <span className="lightFont">Earnings</span>
          </div>
        ) : null}
        <div className="accountBalance">
          <span className="regularFont font16">
            {formatter.format(account.balance * 0.01)}
          </span>
          <span className="lightFont">Balance</span>
        </div>
      </div>
    </div>
  )
}
