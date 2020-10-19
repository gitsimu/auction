import React from 'react'
import * as firebase from "firebase/app"
import * as script from '../js/script.js'
// import { connect } from 'react-redux'

const AddGoods = ({ database, dispatch, info }) => {
  const [goodsType, setGoodsType] = React.useState(0)
  const [goodsName, setGoodsName] = React.useState('')
  const [goodsOwner, setGoodsOwner] = React.useState('')
  const [goodsPeriod, setGoodsPeriod] = React.useState(24)
  const [goodsStartingPrice, setGoodsStartingPrice] = React.useState(0)
  const [goodsImmediatePrice, setGoodsImmediatePrice] = React.useState(0)
  

  const addGoods = () => {
    const timestamp = firebase.database.ServerValue.TIMESTAMP
    const userId = info.id
    const goodsId = script.uuidv4()

    database.ref(`/goods/${userId}/${goodsId}`).update({
      type: goodsType,
      name: goodsName,
      owner: goodsOwner,
      period: goodsPeriod,
      startingPrice: goodsStartingPrice,
      immediatePrice: goodsImmediatePrice,
      timestamp: timestamp
    })
  }

  return (
    <div></div>
  )
}

// const mapStateToProps = state => ({
//   info: state.info,
//   message: state.message,
// })

export default AddGoods
