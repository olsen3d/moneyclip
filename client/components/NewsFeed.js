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
    <div id="profile">
      <div className="header">
        <span className="lightFont">News Feed</span>
        <span className="regularFont alignRight">
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
      <ul className="">
        {news &&
          news.map(story => <NewsPreview key={story.id} story={story} />)}
      </ul>
    </div>
  )
}
