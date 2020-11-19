import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCategory } from '../actions'

const CATEGORY = [
  {key: 0, name: 'category 0'},
  {key: 1, name: 'category 1'},
  {key: 2, name: 'category 2'},
  {key: 3, name: 'category 3'},
  {key: 4, name: 'category 4'},
  {key: 5, name: 'category 5'},
]

function AuctionSearch(info) {
  useEffect(() => {
    console.log('info', info)
  }, [])

  return (
    <div className="auction-search">
      <div className="auction-search-top">
        <div className="aution-search-input">
          <input type="text"></input>
        </div>
      </div>
      <div className="auction-search-bottom">
        <div className="aution-search-category">
          {CATEGORY.map((m, i) => {
            return (
              <div key={m.key}>{m.name}</div>
            )
          })}
        </div>      
        <div className="aution-search-list"></div>
      </div>    
    </div>
  )
}

const mapStateToProps = state => ({
  info: state.info,
})

export default connect(mapStateToProps)(AuctionSearch)