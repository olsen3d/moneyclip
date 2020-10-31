import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import NewsPreview from './NewsPreview'
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
            Load | Refresh
          </button>
        </span>
      </div>
      <ul className="listWidth">
        {news &&
          news.map(story => <NewsPreview key={story.id} story={story} />)}
      </ul>
    </div>
  )
}
