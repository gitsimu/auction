import React from 'react'
import { connect } from 'react-redux'
import { selectedItem } from '../actions'
import { CATEGORY, ITEMS } from '../js/global'
import Item from '../components/Item'

function AuctionSearch({info, selectedItem, ...props}) {
  const [loading, isLoading] = React.useState(false)
  const [category, setCategory] = React.useState(0)
  const [items, setItems] = React.useState([])
  const [searchKeyword, setSearchKeyword] = React.useState()
  const [searchKeywordGuide, setSearchKeywordGuide] = React.useState('')
  const database = props.database

  React.useEffect(() => {
    console.log('info', info)
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
    const ref = database.ref(`/Items`)
    const item = ITEMS.filter((item) => { return item.name === searchKeyword })
    if (!searchKeyword || searchKeyword === '') {
      setCategory(0)
    } else {
      isLoading(true)
      const keyword = item.length > 0 ? item[0].key : searchKeyword
      ref.orderByChild('key').equalTo(keyword).on('value', snapshots => {
        const arr = []
        snapshots.forEach(snapshot => {
          const isExpired = new Date().getTime() - snapshot.val().timestamp > 84600000;
          !isExpired && arr.push(snapshot.val())
        })
        setItems(arr)
        setSearchKeywordGuide('')
        selectedItem(undefined)
        isLoading(false)
      })
    } 
    // else { alert(`[${searchKeyword}] 정보가 없습니다.\n다시 한 번 시도해주세요.`) }    

    return () => { ref.off() }
  }, [searchKeyword])

  React.useEffect(() => {
  }, [searchKeywordGuide])

  return (
    <div className="auction-search">
      <div className="auction-search-top">
        <div className="auction-search-area">
          <i className="icon-magnifier"></i>
          <input 
            type="text" 
            className="auction-search-input"
            onChange={(e) => { setSearchKeywordGuide(e.target.value) }}
            onKeyPress={(e) => { e.key === "Enter" && setSearchKeyword(e.target.value) }}>
          </input>          
          {searchKeywordGuide && searchKeywordGuide.length > 1 && (
            <div className="auction-search-guide">              
              {ITEMS.filter((item) => { return item.name.indexOf(searchKeywordGuide) > -1 }).map((m) => {
                return (<div onClick={() => {setSearchKeyword(m.name)} }>{m.name}</div>)
              })}            
            </div>
          )}
        </div>
      </div>
      <div className="auction-search-bottom">        
        <div className="auction-search-category">
          {CATEGORY.map((m, i) => {
            return (<div key={m.key} onClick={() => {setCategory(m.key)}}>{m.name}</div>)
          })}
        </div>
        <div className="auction-search-body">
          {/* <div className="auction-search-list-item header">
            <div style={{width: 50}}></div>
            <div className="name">품명</div>
            <div className="info">설명</div>
            <div className="price1">입찰가</div>
            <div className="price2">즉구가</div>
            <div className="time">만료</div>
            <div className="writer">게시자</div>            
          </div> */}
          <div className="sub-title">목록</div>
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

const mapDispatchToProps = dispatch => ({
  selectedItem: i => dispatch(selectedItem(i))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuctionSearch)