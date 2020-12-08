import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import Item from '../components/Item'
import { CATEGORY, ITEMS } from '../js/global'

function Buy({info, ...props}) {
  return (
    <div></div>
  )
}

const mapStateToProps = state => ({
  info: state.info,
})

export default connect(mapStateToProps)(Buy)