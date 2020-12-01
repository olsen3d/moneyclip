import React from 'react'
import {Link} from 'react-router-dom'

const getTime = time => {
  const format = new Date(time * 1000)
  const dayMap = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }
  const day = dayMap[format.getDay()]

  return `${day} ${format.getHours()}:${format.getMinutes()}`
}

export default function NewsPreview({story}) {
  return (
    <a className="cardFullLink" href={story.url}>
      <div className="accountOverviewContainer">
        <div className="accountLogo">
          <img width="42px" height="42px" src={story.image} />
          <div className="accountName">
            <p className="regularFont font16">{story.headline}</p>
            <p style={{marginTop: '2px'}} className="lightFont">
              {story.summary}
            </p>
            <p style={{marginTop: '6px'}} className="regularFont font11">
              {story.source} | {story.category} | Published{' '}
              {getTime(story.datetime)}
            </p>
          </div>
        </div>
      </div>
    </a>
  )
}
