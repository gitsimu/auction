import React, { useState } from 'react'
import { connect } from 'react-redux'
import { selectedItem } from '../actions'
import firebase from 'firebase/app'
import * as script from '../js/script'
import { CATEGORY, ITEMS } from '../js/global'
import Bidding from '../components/Bidding'
import History from '../components/History'

// const CATEGORY = [
//   {key: 0, name: 'weapon'},
//   {key: 1, name: 'armor'},
//   {key: 2, name: 'accessary'},
//   {key: 3, name: 'consumable'},
//   {key: 4, name: 'etc'},
//   {key: 5, name: 'minions'},
// ]
// const ITEMS = [
//   {key: 0, category: 0, name: 'item 0', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
//   {key: 1, category: 1, name: 'item 1', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
//   {key: 2, category: 2, name: 'item 2', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
//   {key: 3, category: 3, name: 'item 3', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
//   {key: 4, category: 4, name: 'item 4', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
//   {key: 5, category: 5, name: 'item 5', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
// ]

function Item({user, info, selectedItem, ...props}) {    
  const [time, setTime] = React.useState('-')
  const body = React.useRef(null)
  const item = props.item
  const itemInfo = ITEMS.filter((i) => { return parseInt(i.key) === parseInt(item.key)});
  const name = itemInfo.length > 0 ? itemInfo[0].name : 'unknown'
  const thumbnail = itemInfo.length > 0 ? itemInfo[0].thumbnail : 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'      
  const database = props.database
  const mine = props.mine

  const onBiddingConfirm1 = (price) => {
    let p =  parseInt(price),
        p1 = parseInt(item.price1),
        p2 = parseInt(item.price2)

    if (p < p1 + 100) {
      alert('최소 입찰단위는 100vip 입니다.')
      return
    } else if (p > p2) {
      const result = confirm(`즉구가(${script.numberWithCommas(p2)})보다 높은 가격입니다.\n즉구가로 진행하시겠습니까?`)
      if (result) {
        p = p2
      }
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
      userid: info.userid,
      price: p,
      timestamp: timestamp
    })
    database.ref(`/Users/${info.id}/buy/${item.id}`).update({
      price: p,
      timestamp: timestamp
    })
    alert('입찰하였습니다.')
  }
  const onBiddingConfirm2 = () => {
    if (confirm(`즉구가(${script.numberWithCommas(p2)})로 구매하시겠습니까?`)) {      
      let p2 = parseInt(item.price2)

      const biddingId = Math.random().toString(36).substr(2, 9)
      const timestamp = firebase.database.ServerValue.TIMESTAMP

      database.ref(`/Items/${item.id}`).update({
        price1: p2,      
        timestamp: 0
      })
      database.ref(`/Items/${item.id}/history/${biddingId}`).update({
        userid: info.userid,
        price: p2,
        timestamp: timestamp
      })
      alert('즉시구매 하였습니다.')
    }
  }

  React.useEffect(() => {
    const interval = setInterval(() => {      
      const time = (item.timestamp + 84600000 - new Date().getTime()) / 1000
      const hours = Math.floor(time / 3600)
      const minites = Math.floor(time % 3600 / 60)
      const seconds = Math.floor(time % 3600 % 60)
      // console.log(time, hours, minites, seconds)
          
      // setTime(time > 0 ? `${hours > 9 ? hours : '0' + hours}:${minites > 9 ? minites : '0' + minites}:${seconds > 9 ? seconds : '0' + seconds}` : '만료')
    }, 1000)

    return () => {clearInterval(interval)}
  }, [item])

  return (
    <>
      <div className={user.selectedItem === item.id ? "auction-search-list-item active" : "auction-search-list-item"}
        ref={body}
        onClick={(e) => 
          selectedItem(item.id)
        }>
        <img src={thumbnail}></img>
        <div className="name">{name}</div>
        <div className="description">{item.description}</div>
        <div className="price1">{script.numberWithCommas(item.price1)}</div>
        <div className="price2">{script.numberWithCommas(item.price2)}</div>
        <div className="time">{time}</div>
        <div className="writer">
          {item.discord && item.discord.id && item.discord.avatar && (
            <img src={`https://cdn.discordapp.com/avatars/${item.discord.id}/${item.discord.avatar}.png`}></img>
          )}
          <span>{item.discord.userid}</span>
        </div>        
        {/* <div className="time">{script.getNiceTime(item.timestamp, new Date(), 1, true)}</div> */}
      </div>
      {/* {console.log(user.selectedItem, item.id)} */}
      {!mine && user.selectedItem === item.id && (
        <Bidding price={item.price1} onConfirm1={onBiddingConfirm1} onConfirm2={onBiddingConfirm2}/>
      )}
      {mine && user.selectedItem === item.id && (
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
