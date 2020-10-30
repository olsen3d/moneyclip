import React from 'react'
import {Link} from 'react-router-dom'

export default function NewsPreview({story}) {
  return (
    <a className="accountLink" href={story.url}>
      <div className="accountOverviewContainer">
        <div className="accountLogo">
          <img width="42px" height="42px" src={story.image} />
          <div className="accountName">
            <p className="regularFont font16">{story.headline}</p>
            <p className="lightFont">{story.summary}</p>
          </div>
        </div>
      </div>
    </a>
  )
}
