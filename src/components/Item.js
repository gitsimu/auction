import React, { useState } from 'react'
import { connect } from 'react-redux'
import { selectedItem } from '../actions'
import * as script from '../js/script'
import Bidding from '../components/Bidding'

const CATEGORY = [
  {key: 0, name: 'weapon'},
  {key: 1, name: 'armor'},
  {key: 2, name: 'accessary'},
  {key: 3, name: 'consumable'},
  {key: 4, name: 'etc'},
  {key: 5, name: 'minions'},
]
const ITEMS = [
  {key: 0, category: 0, name: 'item 0', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
  {key: 1, category: 1, name: 'item 1', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
  {key: 2, category: 2, name: 'item 2', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
  {key: 3, category: 3, name: 'item 3', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
  {key: 4, category: 4, name: 'item 4', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
  {key: 5, category: 5, name: 'item 5', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
]

function Item({user, info, selectedItem, ...props}) {    
  const [time, setTime] = React.useState('-')
  const body = React.useRef(null)
  const item = props.item
  const itemInfo = ITEMS.filter((i) => { return parseInt(i.key) === parseInt(item.key)});
  const name = itemInfo.length > 0 ? itemInfo[0].name : 'unknown'
  const thumbnail = itemInfo.length > 0 ? itemInfo[0].thumbnail : 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'      
  const database = props.database

  const onBiddingConfirm1 = (price) => {
    const ref = database.ref(`/Item/${item.category}/${item.id}`).update({
      price1: price,
    })
  }
  const onBiddingConfirm2 = (price) => {

  }

  React.useEffect(() => {
    const interval = setInterval(() => {      
      const time = (item.timestamp + 84600000 - new Date().getTime()) / 1000
      const hours = Math.floor(time / 3600)
      const minites = Math.floor(time % 3600 / 60)
      const seconds = Math.floor(time % 3600 % 60)      

      
      setTime(`${hours > 9 ? hours : '0' + hours}:${minites > 9 ? minites : '0' + minites}:${seconds > 9 ? seconds : '0' + seconds}`)
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
        <div className="info">{item.info}</div>
        <div className="price1">{script.numberWithCommas(item.price1)}</div>
        <div className="price2">{script.numberWithCommas(item.price2)}</div>        
        <div className="writer">{item.writer}</div>
        <div className="time">{time}</div>
        {/* <div className="time">{script.getNiceTime(item.timestamp, new Date(), 1, true)}</div> */}
      </div>
      {/* {console.log(user.selectedItem, item.id)} */}
      {user.selectedItem === item.id && (
        <Bidding price={item.price1} onConfirm1={onBiddingConfirm1} onConfirm2={onBiddingConfirm2}/>
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
