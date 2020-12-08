import React from 'react'
import * as script from '../js/script'

function Bidding({...props}) {
  const [price, setPrice] = React.useState({value: 0, valid: true})

  const onChangePrice = (e, set) => {
    const re = /^[0-9\b]+$/
    const value = e.target.value
    const valid = (value !== '' && re.test(value))

    set({value: value, valid: valid})
    console.log('onChangePrice', {value: value, valid: valid})
  }

  return (
    <div className="bidding">
      <div className="bidding-input">
        <input type="text" onChange={(e) => {onChangePrice(e, setPrice)}} placeholder={script.numberWithCommas(parseInt(props.price) + 100) + ' 부터'}></input>
      </div>
      <div className="bidding-confirm" 
        onClick={() => {
          if (price.valid) { props.onConfirm1(price.value) }
          else { alert('유효한 값이 아닙니다.') }
        }}
        ><div>입찰</div>
      </div>
      <div className="bidding-close" onCancel={() => {props.onConfirm2()}}><div>즉시구매</div></div>
    </div>
  )
}

export default Bidding