import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { connection } from '../src/actions'

import AuctionSearch from '../src/containers/AuctionSearch'

// https://medium.com/@orels1/using-discord-oauth2-a-simple-guide-and-an-example-nodejs-app-71a9e032770

function Main() {
  const [screen, setScreen] = useState(0)

  useEffect(() => {
    console.log('start');
  }, [])

  return (
    <div className="auction-main">
      <div className="container-menu">
        <div className={screen === 0 ? "container-menu-tab active" : "container-menu-tab"} onClick={() => { setScreen(0) }}>
          검색
        </div>
        <div className={screen === 1 ? "container-menu-tab active" : "container-menu-tab"} onClick={() => { setScreen(1) }}>
          입찰 내역
        </div>
        <div className={screen === 2 ? "container-menu-tab active" : "container-menu-tab"} onClick={() => { setScreen(2) }}>
          판매 내역
        </div>
      </div>
      <div className="container-screen">
        {screen === 0 && (
          <AuctionSearch/>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  info: state.info,
})

const mapDispatchToProps = dispatch => ({
  connection: () => dispatch(connection())
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)