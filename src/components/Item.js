import React, { useState } from 'react'
import { connect } from 'react-redux'
import { selectedItem } from '../actions'
import * as script from '../js/script'
import Bidding from '../components/Bidding'

function Item({user, info, selectedItem, ...props}) {  
  const item = props.item
  const body = React.useRef(null)
  const [showBidding, isShowBidding] = useState(false);

  const showBidding1 = (e) => {
    if (body) {
      console.log('body',body)
      console.log('e',e)
    }
  }

  return (
    <>
      <div className={user.selectedItem === item.id ? "auction-search-list-item active" : "auction-search-list-item"}
        ref={body}
        onClick={(e) => 
          selectedItem(item.id)          
        }>
        <img src={item.thumbnail}></img>
        <div className="name">{item.name}</div>
        <div className="info">{item.info}</div>
        <div className="price1">{script.numberWithCommas(item.price1)}</div>
        <div className="price2">{script.numberWithCommas(item.price2)}</div>
        <div className="time">{script.getNiceTime(item.timestamp, new Date(), 1, true)}</div>
        <div className="writer">{item.writer}</div>
      </div>
      {console.log(user.selectedItem, item.id)}
      {user.selectedItem === item.id && (
        <Bidding price={item.price1}/>
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
