import React from 'react'
import { connect } from 'react-redux'

import Item from '../components/Item'

const CATEGORY = [
  {key: 0, name: 'category 0'},
  {key: 1, name: 'category 1'},
  {key: 2, name: 'category 2'},
  {key: 3, name: 'category 3'},
  {key: 4, name: 'category 4'},
  {key: 5, name: 'category 5'},
]

function AuctionSearch(info) {
  const [category, setCategory] = React.useState(0)
  const [items, setItems] = React.useState([])
  
  React.useEffect(() => {
    console.log('info', info)

    const arr = []
    for(let i = 0; i < 10; i++) {
      arr.push({
        id: `test-${i}`,
        thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png',
        name: `Item code-${i}`,
        info: '+ 10 Enhanced',
        price1: 20000000,
        price2: 30000000,
        timestamp: 1605840669702,
        writer: `[nonamed-${i}]`
      })
    }
    setItems(arr)
  }, [])

  React.useEffect(() => {
    // console.log('rerendering', items)
  }, [category, items])

  return (
    <div className="auction-search">
      <div className="auction-search-top">
        <div className="auction-search-area">
          <input type="text" class="auction-search-input"></input>
          <div class="auction-search-input-button">검색</div>
        </div>
      </div>
      <div className="auction-search-bottom">
        <div className="auction-search-category">
          {CATEGORY.map((m, i) => {
            return (<div key={m.key} onClick={() => {setCategory(m.key)}}>{m.name}</div>)
          })}
        </div>
        <div className="auction-search-body">
          <div className="auction-search-list-item header">
            <div style={{width: 50}}></div>
            <div className="name">품명</div>
            <div className="info">설명</div>
            <div className="price1">입찰가</div>
            <div className="price2">즉구가</div>
            <div className="time">게시일</div>
            <div className="writer">게시자</div>
          </div>
          <div className="auction-search-list">
            {items.map((m, i) => {
              return (<Item item={m}/>)
            })}  
          </div>
        </div>        
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  info: state.info,
})

export default connect(mapStateToProps)(AuctionSearch)