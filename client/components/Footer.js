import React from 'react'

export default function Footer() {
  return (
    <div id="footer">
      <div className="column">
        <span className="regularFont largeFont header">MoneyClip.dev</span>
        <span className="regularFont mediumLargeFont">Mike Olsen</span>
        <div className="spacer" />
        <span className="lightFont mediumLargeFont smallSpacer">
          <a className="linkDark" href="https://www.olsen.dev">
            Website
          </a>
        </span>
        <span className="lightFont mediumLargeFont smallSpacer">
          <a className="linkDark" href="https://github.com/olsen3d">
            Github
          </a>
        </span>
        <span className="lightFont mediumLargeFont smallSpacer">
          <a className="linkDark" href="https://www.linkedin.com/in/olsen3d/">
            LinkedIn
          </a>
        </span>
      </div>
      <div className="column lightFont footerText">
        Moneyclip.dev is a money management portfolio site created by Mike
        Olsen. The main purpose is to display fullstack skills including a
        frontend with react, redux, and d3.js. And a backend with Node.js,
        Express, sequelize, PostgreSQL. I also used finnhub.io api for stock
        market calls.
      </div>
      <div id="bottomImgContainer">
        <img id="bottomImg" src="/img/bottomLogo.png" />
      </div>
    </div>
  )
}
