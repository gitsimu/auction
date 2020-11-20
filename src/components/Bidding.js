import React from 'react'
import * as script from '../js/script'

function Bidding({...props}) {
  return (
    <div className="bidding">
      <div className="bidding-input">
        <input type="text" placeholder={script.numberWithCommas(props.price + 1000) + ' 부터'}></input>
      </div>
      <div className="bidding-confirm"><div>입찰하기</div></div>
      <div className="bidding-close"><div>닫기</div></div>
    </div>
  )
}

export default Bidding