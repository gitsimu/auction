import React from 'react'
import { connect } from 'react-redux'

import { CATEGORY, ITEMS } from '../js/global'
import Item from '../components/Item'

// const CATEGORY = [
//   {key: 0, name: 'weapon'},
//   {key: 1, name: 'armor'},
//   {key: 2, name: 'accessary'},
//   {key: 3, name: 'consumable'},
//   {key: 4, name: 'etc'},
//   {key: 5, name: 'minions'},
// ]

function AuctionSearch({info, ...props}) {
  const [loading, isLoading] = React.useState(false)
  const [category, setCategory] = React.useState(0)
  const [items, setItems] = React.useState([])
  const database = props.database

  React.useEffect(() => {
    console.log('info', info)

    // const arr = []
    // for(let i = 0; i < 5; i++) {
    //   arr.push({
    //     id: `test-${i}`,
    //     thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png',
    //     key: i,
    //     info: '+ 10 Enhanced',
    //     price1: 20000000,
    //     price2: 30000000,
    //     timestamp: 1605840669702,
    //     writer: `[nonamed-${i}]`
    //   })
    // }    
    // setItems(arr)
  }, [])

  React.useEffect(() => {
    isLoading(true)
    
    const ref = database.ref(`/Items`)
    ref.orderByChild('category').equalTo(`${category}`).on('value', snapshots => {
      const arr = []
      snapshots.forEach(snapshot => {
        const isExpired = new Date().getTime() - snapshot.val().timestamp > 84600000;
        !isExpired && arr.push(snapshot.val())        
      })
      setItems(arr)
      isLoading(false)
    })

    return () => { ref.off() }
  }, [category])

  React.useEffect(() => {
    // console.log('rerendering', items)
  }, [category, items])

  return (
    <div className="auction-search">
      <div className="auction-search-top">
        <div className="auction-search-area">
          <input type="text" className="auction-search-input"></input>
          <div className="auction-search-input-button">검색</div>
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
            <div className="time">만료</div>
            <div className="writer">게시자</div>            
          </div>
          <div className="auction-search-list">
            {items.map((m, i) => {
              return (<Item item={m} database={database} key={m.id} mine={false}/>)
            })}
            {items.length === 0 && (
              <div className="auction-search-list-empty">상품이 없습니다.</div>
            )}
            {loading && (<div id="loading"><div></div></div>)}
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