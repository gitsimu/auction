import React, { useState } from 'react'
import { connect } from 'react-redux'
import { selectedItem } from '../actions'
import firebase from 'firebase/app'
import * as script from '../js/script'
import { CATEGORY, ITEMS } from '../js/global'
import Bidding from '../components/Bidding'
import History from '../components/History'
import Timer from '../components/Timer'
import User from '../components/User'

function Item({user, info, selectedItem, ...props}) {      
  const body = React.useRef(null)
  const database = props.database
  const mine = props.mine
  const item = props.item
  const itemInfo = ITEMS.filter((i) => { return parseInt(i.key) === parseInt(item.key)})  
  let name = itemInfo.length > 0 ? itemInfo[0].name : 'unknown'
  let thumbnail = itemInfo.length > 0 ? itemInfo[0].thumbnail : undefined
  const [expired, isExpired] = React.useState(false)

  // category 5 : pet
  if (item.category === '5') {
    console.log('item', item)
    name = `[Lv.${item.level}] ${item.key}`
  }

  console.log('info', info)

  const onBiddingConfirm1 = (price) => {
    let p =  parseInt(price),
        p1 = parseInt(item.price1),
        p2 = parseInt(item.price2)

    if (p < p1 + 100) {
      alert(`${p1 + 100}vip 부터 입찰할 수 있습니다.`)
      return
    } else if (p > p2) {
      const result = confirm(`즉구가(${script.numberWithCommas(p2)})보다 높은 가격입니다.\n계속하시겠습니까?`)
      if (result) {}
      else {
        return
      }
    }
    
    const biddingId = Math.random().toString(36).substr(2, 9)
    const timestamp = firebase.database.ServerValue.TIMESTAMP

    database.ref(`/Items/${item.id}`).update({
      price1: p,
      timestamp: item.timestamp + 30000 // + 30sec
    })
    database.ref(`/Items/${item.id}/history/${biddingId}`).update({
      id: info.id,
      userinfo: info,
      price: p,
      timestamp: timestamp
    })
    database.ref(`/Users/${info.id}/buy/${item.id}`).update({
      item: item,
      price: p,
      timestamp: timestamp
    })
    alert('입찰하였습니다.')
  }
  const onBiddingConfirm2 = () => {
    let p1 = parseInt(item.price1)
    let p2 = parseInt(item.price2)
    if (p1 > p2) {
      alert('진행 중인 입찰가가 즉구가를 상회하였습니다.\n일반 입찰로 진행해주세요.')
    } else if (confirm(`즉구가(${script.numberWithCommas(p2)})로 구매하시겠습니까?`)) {            
      const biddingId = Math.random().toString(36).substr(2, 9)
      const timestamp = firebase.database.ServerValue.TIMESTAMP

      database.ref(`/Items/${item.id}`).update({
        state: 0,
        price1: p2,
        timestamp: 0
      })
      database.ref(`/Items/${item.id}/history/${biddingId}`).update({
        id: info.id,
        userinfo: info,
        price: p2,
        timestamp: timestamp
      })
      alert('즉시구매 하였습니다.')
    }
  }

  const onDeleteItems = (itemId) => {
    database.ref(`/Items/${itemId}`).remove()
  }

  return (
    <>
      <div className={user.selectedItem === item.id ? "auction-search-list-item active" : "auction-search-list-item"}
        ref={body}
        onClick={(e) => { selectedItem(user.selectedItem === item.id ? undefined : item.id) }}>
        {thumbnail && (
          <img src={thumbnail}></img>
        )}
        {!thumbnail && (
          <div className="icon"><i className="icon-ghost"></i></div>
        )}
        <div className="name">{name}</div>
        <div className="description">{item.description}</div>
        <div className="price1">{script.numberWithCommas(item.price1)}</div>
        <div className="price2">{script.numberWithCommas(item.price2)}</div>
        <Timer timestamp={item.timestamp} isExpired={isExpired}/>
        <User userinfo={item.discord} onDeleteItems={onDeleteItems} expired={expired} item={item.id}/>
      </div>
      {/* {console.log(user.selectedItem, item.id)} */}
      {!mine && user.selectedItem === item.id && (
        <Bidding price={item.price1} onConfirm1={onBiddingConfirm1} onConfirm2={onBiddingConfirm2}/>
      )}
      {user.selectedItem === item.id && (
        <History history={item.history}/>
      )}
    </>
  )
}


const mapStateToProps = state => ({
  user: state.user,
  info: state.info,
})

const mapDispatchToProps = dispatch => ({
  selectedItem: i => dispatch(selectedItem(i))
})

export default connect(mapStateToProps, mapDispatchToProps)(Item)
