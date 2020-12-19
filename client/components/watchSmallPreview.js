import React from 'react'
import {Link} from 'react-router-dom'

export default function WatchSmallPreview({stock}) {
  return (
    <div className="accountSmallPreview">
      <Link className="accountNavLink" to="/watchList">
        {stock.name}
      </Link>
    </div>
  )
}
