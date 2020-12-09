import React from 'react'
import {stockData} from '../../script/utils.js'

export default function StrategyDataDisplay({data, strategy, stock}) {
  return (
    <div className="accountDataDisplay">
      {stock ? (
        <React.Fragment>
          <div>
            <span className="regularFont font16 header">{stock}</span>
          </div>
          <div className="spacer" />
          <span className="lightFont">{stockData[stock].fullName}</span>
          <div className="spacer" />
          <div>{stockData[stock].description}</div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div>
            <span className="regularFont font16 header">{`${strategy[0] +
              strategy.slice(1).toLowerCase()} Strategy`}</span>
          </div>
          <div className="spacer" />
          <span className="lightFont">Portfolio Overview</span>
          <div className="spacer" />
          <div>
            {data.map(s => {
              return (
                <div key={s.name}>
                  {s.name}: {s.value}%
                </div>
              )
            })}
          </div>
        </React.Fragment>
      )}
    </div>
  )
}
