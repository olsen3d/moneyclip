import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import AccountPreview from './AccountPreview'
import {loadNews} from '../store/thunks'

export default function NewsFeed() {
  const dispatch = useDispatch()
  const news = useSelector(state => state.news)

  return (
    <div id="profile">
      <div className="header">
        <span className="lightFont">News Feed</span>
        <span className="regularFont alignRight textButton">
          <button
            type="button"
            onClick={() => dispatch(loadNews())}
            className="linkDark"
          >
            Refresh
          </button>
        </span>
      </div>
      <ul>{news && news.map(story => <h3>{story.headline}</h3>)}</ul>
    </div>
  )
}
