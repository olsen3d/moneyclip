import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import NewsPreview from './NewsPreview'
import {loadNews} from '../store/thunks'

export default function NewsFeed() {
  const dispatch = useDispatch()
  const news = useSelector(state => state.news)

  useEffect(() => {
    news.length || dispatch(loadNews())
  }, [])

  return (
    <div id="mainContent">
      <div id="topBar">
        <div className="header">
          <span className="largerFont regularFont">News Feed</span>
          <span className="lightFont alignRight">
            <button
              type="button"
              onClick={() => dispatch(loadNews())}
              className="linkDark textButton"
            >
              Refresh
            </button>
          </span>
        </div>
        <div className="subHeader">
          <span className="regularFont">
            Top financial, business, and technology stories{' '}
          </span>
        </div>
      </div>
      <div id="cardHolder">
        {news &&
          news.map(story => <NewsPreview key={story.id} story={story} />)}
      </div>
    </div>
  )
}
