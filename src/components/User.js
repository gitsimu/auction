import React from 'react'
import { connect } from 'react-redux'
// import * as script from '../js/script'

function User({user, info, ...props}) {
  const item = props.item
  const expired = props.expired
  const onDeleteItems = props.onDeleteItems  

  return (
    <div className="user">
      {item && item.id && item.avatar && (
        <img src={`https://cdn.discordapp.com/avatars/${item.id}/${item.avatar}.png`}></img>
      )}
      <span>{item.userid}</span>
      {expired && info.id === item.id && (
        <div className="delete-item" onClick={() => {onDeleteItems(item.id)}}>Delete</div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  info: state.info,
})

export default connect(mapStateToProps)(User)