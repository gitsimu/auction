import React from 'react'
import * as script from '../js/script'

function Bidding({...props}) {
  const [price, setPrice] = React.useState(0)

  return (
    <div className="bidding">
      <div className="bidding-input">
        <input type="text" onChange={(e) => {setPrice(e.target.value)}} placeholder={script.numberWithCommas(props.price + 1000) + ' 부터'}></input>
      </div>
      <div className="bidding-confirm" onClick={() => {props.onConfirm1(price)}}><div>입찰</div></div>
      <div className="bidding-close" onCancel={() => {props.onConfirm2(price)}}><div>즉시구매</div></div>
    </div>
  )
}

export default Bidding