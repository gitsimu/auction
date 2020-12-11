import React from 'react'
import { connect } from 'react-redux'
// import * as script from '../js/script'

function User({user, info, ...props}) {
  const userinfo = props.userinfo
  const expired = props.expired
  const onDeleteItems = props.onDeleteItems  
  const item = props.item

  return (
    <div className="user">
      {item && userinfo.id && userinfo.avatar && (
        <img src={`https://cdn.discordapp.com/avatars/${userinfo.id}/${userinfo.avatar}.png`}></img>
      )}
      <span>{userinfo.userid}</span>
      {expired && item && info.id === userinfo.id && (
        <div className="delete-item" onClick={() => {onDeleteItems(item)}}>Delete</div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  info: state.info,
})

export default connect(mapStateToProps)(User)